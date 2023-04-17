import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const SingleCourse = ({ course }) => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <pre>{JSON.stringify(course, null, 4)}</pre>
      <div className="container-fluid">
        <div className="row"></div>
      </div>
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`);
  return {
    props: {
      course: data,
    },
  };
}

export default SingleCourse;
