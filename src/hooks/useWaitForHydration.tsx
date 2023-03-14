import { Spin } from "antd";
import { useEffect, useState } from "react";

const useWaitForHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  //Wait till NextJS rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const loader = <Spin spinning />;

  return [isHydrated, loader] as [boolean, typeof loader];
};

export default useWaitForHydration;
