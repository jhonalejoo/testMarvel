import {ApisauceInstance, create} from 'apisauce';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type MarvelHeroesListResponse = {
  code: number;
  status: string;
  data: {
    results: Array<{
      comics: {available: number; items: any[]};
      thumbnail: {path: string; extension: string};
      id: number;
      name: string;
    }>;
  };
};

type MarvelHeroComicsListResponse = {
  code: number;
  status: string;
  data: {
    results: Array<{
      id: number;
      title: string;
      description: string;
    }>;
  };
};

type MarvelResponse = MarvelHeroesListResponse | MarvelHeroComicsListResponse;
type MarvelHero = MarvelHeroesListResponse['data']['results'][0];
type MarvelHeroData = Array<MarvelHero>;
type MarvelComicData = Array<
  MarvelHeroComicsListResponse['data']['results'][0]
>;
type MarvelData = MarvelHeroData | MarvelComicData;

type ContextStateUninitialized = {
  url?: undefined;
  isFetching: false;
  data?: undefined;
};

type ContextStateInitialized = {
  url: string;
  isFetching: false;
  data?: undefined;
};

type ContextStateFetching<T> = {
  url: string;
  isFetching: true;
  data?: T;
};

type ContextStateFetched<T> = {
  url: string;
  isFetching: false;
  data: T;
  apisauceInstance: ApisauceInstance;
};

type ApiRequestContextState<T> =
  | ContextStateUninitialized
  | ContextStateInitialized
  | ContextStateFetching<T>
  | ContextStateFetched<T>;

interface IActions {
  paginate(): void;
}

const initialState = {
  isFetching: false,
};

const ApiRequestContext = createContext<
  [ApiRequestContextState<MarvelData>, IActions]
>([initialState as ContextStateUninitialized, {paginate: () => undefined}]);

export const useCachedRequests = (): [
  ApiRequestContextState<MarvelData>,
  IActions,
] => {
  return useContext(ApiRequestContext);
};

function getAuthQueryStringParams(): {
  apikey: string;
  ts: string;
  hash: string;
} {
  const publicKey = `${process.env.PUBLIC_KEY}`;
  const ts = '1';
  const md5Hash = 'd9794679b62462f726d2c8e76a93a3ad';
  return {
    apikey: publicKey,
    ts: ts,
    hash: md5Hash,
  };
}

function getPaginationQueryStringParams(
  maxResults: number,
  page: number,
): {
  limit: string;
  offset: string;
} {
  return {
    limit: maxResults.toString(),
    offset: (page * maxResults).toString(),
  };
}

interface IActions {
  paginate(): void;
}

type Props = {
  url: string;
  maxResultsPerPage: number;
  children: JSX.Element;
};

type ProxyHandler<T, P extends string> = {
  get?(target: T, p: P, receiver: any): any;
  set?(
    target: {results: {[key in P]?: T}},
    p: P,
    value: any,
    receiver: any,
  ): boolean;
};

declare const Proxy: {
  new <T extends object>(
    target: {results: {[key in string]?: T}; apiInstance: ApisauceInstance},
    handler: ProxyHandler<T, string>,
  ): {[key: string]: Promise<T>};
};

const marvelProxy = new Proxy<MarvelResponse>(
  {
    apiInstance: create({baseURL: 'https://gateway.marvel.com'}),
    results: {},
  },
  {
    get: function <T extends MarvelResponse>(
      target: {
        results: {
          [key in string]?: T;
        };
      },
      url: string,
    ) {
      const values = target;

      return new Promise<T>(async (resolve, reject) => {
        if (values.results.hasOwnProperty(url)) {
          resolve(values.results[url] as T);
          return;
        }

        try {
          const response = await (
            target as {
              results: {
                [key in string]?: T;
              };
              apiInstance: ApisauceInstance;
            }
          ).apiInstance.get<T>(url);
          const {data} = response;
          if (response.status !== 200 || !data) {
            throw new Error('Error fetching data');
          }

          (
            target as {
              results: {
                [key in string]?: T;
              };
            }
          ).results[url] = data;

          resolve(data);
        } catch (e) {
          reject(e);
        }
      });
    },
    set: (target, url: string, value) => {
      target.results[url] = value;
      return true;
    },
  },
);

export function CachedRequestsProvider({
  children,
  url,
  maxResultsPerPage,
}: Props) {
  const [state, setState] = useState<ApiRequestContextState<MarvelData>>({
    isFetching: false,
    url,
  } as ContextStateInitialized);

  const [page, setPage] = useState(0);

  const getNavigatableUrl = useCallback((): string => {
    const newUrl = new URL(url);
    Object.entries({
      ...getAuthQueryStringParams(),
      ...getPaginationQueryStringParams(maxResultsPerPage, page),
    }).forEach(param => {
      newUrl.searchParams.append(param[0], param[1]);
    });
    return newUrl.toString().replace(/\/\?/, '?');
  }, [maxResultsPerPage, page, url]);

  useEffect(() => {
    if (state.isFetching || !state.url) {
      return;
    }

    setState(
      state.url !== url
        ? {
            isFetching: true,
            url,
          }
        : {
            ...state,
            isFetching: true,
          },
    );

    marvelProxy[getNavigatableUrl()]?.then(value => {
      setState(
        prevState =>
          ({
            ...prevState,
            isFetching: false,
            data: prevState.data
              ? [...prevState.data, ...value.data.results]
              : value.data.results,
          } as ContextStateFetched<MarvelData>),
      );
    });
  }, [getNavigatableUrl, page, url]);

  return (
    <ApiRequestContext.Provider
      value={[
        state,
        {
          paginate: () => {
            setPage(page + 1);
          },
        },
      ]}>
      {children}
    </ApiRequestContext.Provider>
  );
}
