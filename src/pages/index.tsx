import { useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

import { getDevices } from "@/core/services/api/api";
import { Device } from "@/core/services/api/models";
import HomeView from "@/views/home";

const Home = ({
  devices,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [devicesState, setDevices] = useState(devices);

  useEffect(() => {
    setDevices(devices);
  }, [devices]);

  return (
    <>
      <Head>
        <title>NinjaOne</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeView setDevices={setDevices} devices={devicesState} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  devices: Device[];
}> = async (context) => {
  const devices = (await getDevices()).data;

  return {
    props: {
      devices,
    },
  };
};

export default Home;
