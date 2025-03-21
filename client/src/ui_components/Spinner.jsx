import BeatLoader from "react-spinners/BeatLoader";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-slate-200 dark:bg-zinc-900">
      <BeatLoader
        size={10}
        color="black"
        loading={true}
      />
    </div>
  );
};

export default Spinner;
