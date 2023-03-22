import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import successBlower from "../../assets/Images/success_blower.gif";
import Loading from "../../Components/Shared/Loader";

const Success = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [leadInfo, setLeadInfo] = useState([]);
  // const userDetails = useSelector((state) => state.user)?.userInfo;
  const loader = useSelector((state) => state.user)?.loading;
  // const [searchParams] = useSearchParams();

  // console.log(userDetails);
  // console.log(id.split("-"));
  // console.log(searchParams.get("AccessCode"));
  // console.log(id);

  // useEffect(() => {
  //   console.log(Storage.getItem("l_Details"));
  //   setLeadInfo(Storage.getItem("l_Details"));
  // }, [id]);

  // useEffect(() => {
  //   if (searchParams?.get("AccessCode")) {
  //     dispatch(setLoader(true));
  //     (async () => {
  //       const addEwayPaymentHistory = await handleAddEwayPaymentDetails(
  //         userDetails?.user_id,
  //         parseInt(id.split("-")?.[0]),
  //         parseInt(id.split("-")?.[1]),
  //         "eWay",
  //         searchParams.get("AccessCode"),
  //         userDetails?.full_name,
  //         userDetails?.email,
  //         userDetails?.role_id,
  //         leadInfo?.course_code,
  //         leadInfo?.course_title
  //       );

  //       if (addEwayPaymentHistory?.key === "success") {
  //         dispatch(setLoader(false));
  //         Storage.removeItem("l_Details");
  //         navigate(`/success/${id}`);
  //       }
  //     })();
  //   }
  // }, [dispatch, id, leadInfo, navigate, searchParams, userDetails]);

  return (
    <>
      {/* Loader */}
      <div>
        {loader && (
          <div className="w-full h-full text-7xl absolute top-0 left-0 z-50 flex justify-center items-center bg-white bg-opacity-70">
            <Loading />
          </div>
        )}
      </div>

      <div className="lg:px-4 2xl:px-6 pt-25 pt-1 pb-10 flex justify-center items-center bg-gray-100 h-screen">
        {!loader ? (
          <div
            className="bg-gray-100 shadow-lg"
            style={{
              width: "45%",
            }}
          >
            <div className="bg-white p-10 md:mx-auto rounded-md">
              <div className="flex justify-center items-center">
                <img src={successBlower} alt="" />
              </div>

              <div className="text-center">
                <h3 className="md:text-2.5xl text-base text-gray-900 font-semibold text-center">
                  You Payment Has Been Done Successfully!
                </h3>
                <p className="text-gray-600 my-2">
                  Thank you for completing your secure online payment.
                </p>
                <p className="text-xl font-semibold text-brand-color italic">
                  Have a great day!
                </p>
                <div className="py-10 text-center">
                  <Link
                    to={`/lead/${id.split("-")?.[0]}`}
                    className="px-12 bg-brand-color hover:bg-opacity-90 text-white hover:text-white rounded-full font-semibold py-3"
                  >
                    GO BACK
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="bg-gray-100 shadow-lg py-40 text-5xl font-semibold text-center"
            style={{
              width: "45%",
            }}
          >
            <div>Payment is in Process...</div>
            <div className="italic text-lg font-normal mt-4">
              Please wait untill its done.
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Success;
