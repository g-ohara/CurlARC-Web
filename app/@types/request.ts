interface Stone {
  index: number;
  r: number;
  theta: number;
}

interface Shot {
  index: number;
  type: string;
  success_rate: number;
  shooter: string;
  stones: {
    friend_stones: Stone[];
    enemy_stones: Stone[];
  };
};

interface End {
  index: number;
  score: number;
  shots: Shot[];
}


type registerUserRequest = {
  name: string
  email: string
  id_token: string
}

type signInRequest = {
  email: string
  password: string
}

export type createRecordRequest = {
  place: string
  date: Date
  ends_data: End[]
}
