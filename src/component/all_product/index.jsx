import Header from "./header";
import Card from "./card";
import useFetch from "../../Hooks/useAllData";
import {TailSpin} from "react-loader-spinner";

const Index = () => {
  const { data, loading } = useFetch(process.env.REACT_APP_DEFAULT_API_URL+"/thumbnail");
  console.log(data)

  return (
    <body className="bg-darkTokPed p-5 h-screen text-white">
      <Header />
      <div className="mt-10 text-white">
        {loading ? (
          <div className="spinner-container  w-full h-80 flex justify-center items-center ">
            <TailSpin type="Oval" color="#42b549" height={70} width={70} />
          </div>
        ) : (
          <div className="grid grid-cols-6 gap-2">
            {
              data.map((d) => (
                <Card
                  key={d._id}
                  id={d._id}
                  name={d.name}
                  thumbs={d.picsURL}
                />
              ))}
          </div>
        )}
      </div>
    </body>
  );
};

export default Index;
