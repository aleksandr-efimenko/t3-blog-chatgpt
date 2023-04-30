import { Model } from "openai";
import { useReducer } from "react";
import AnimatedSpinner from "~/components/AnimatedSpinner";
import { api } from "~/utils/api";

const initialModels = {
  data: [],
  error: null,
  loading: false,
};

type ModelsState = typeof initialModels;
type ModelsAction =
  | { type: "FETCHING" }
  | { type: "FETCHED"; payload: Model[] }
  | { type: "FETCH_ERROR"; payload: Error };

function modelsReducer(state: ModelsState, action: ModelsAction) {
  switch (action.type) {
    case "FETCHING":
      return {
        ...state,
        loading: true,
      };
    case "FETCHED":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      throw new Error();
  }
}

export default function OpenAIModels() {
    // const [models, dispatch] = useReducer(modelsReducer, initialModels);
    // const handleSaveModels = () => {
    //   dispatch({ type: "FETCHING" });
    // };

  const { data, error } = api.openAi.getOpenAiModels.useQuery();
  if (error) {
    return <div>Error while fetching models from openAi: {error.message}</div>;
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 text-white">
        <AnimatedSpinner />
      </div>
    );
  }
  //   console.log(data);
  return (
    <>
      <div>
        {/* <div  className="w-1/3"><Button>Save to bd </Button></div> */}
        {data.data
          ?.sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((model: Model) => (
            <div key={model.id} className=" w-full p-4 text-white">
              <div>
                <p>id: {model.id}</p>
              </div>

              <div>
                <p>created: {model.created}</p>
              </div>

              <div>
                <p>owner: {model.owned_by}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
