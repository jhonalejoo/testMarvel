export interface ICardHeroe {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics:{
    available: number;
    items: Array<any>
  };
}