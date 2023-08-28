// import React, { useEffect } from "react";
// import { BiUserCheck, BiUserMinus, BiUserX } from "react-icons/bi";
// import { FaUsers } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import InfoBox from "../../Components/InfoBox/infoBox";
// import {
//   CALC_APPROVED_LOOMS,
//   CALC_PENDING_LOOMS,
//   CALC_SUSPENDED_LOOMS,
// } from "../../redux/features/loom/loomSlice";

// import "./LoomStats.css";

// // Icons
// const icon1 = <FaUsers size={40} color="#fff" />;
// const icon2 = <BiUserCheck size={40} color="#fff" />;
// const icon3 = <BiUserMinus size={40} color="#fff" />;
// const icon4 = <BiUserX size={40} color="#fff" />;

// const LoomStats = () => {
//   const dispatch = useDispatch();

//   const { allLooms, pendingLooms, approvedLooms, suspendedLooms } = useSelector(
//     (state) => state.authloom
//   );

//   // const PendingLooms = pendingLooms;

//   useEffect(() => {
//     dispatch(CALC_APPROVED_LOOMS());
//     dispatch(CALC_SUSPENDED_LOOMS());
//     dispatch(CALC_PENDING_LOOMS());
//   }, [dispatch, allLooms]);

//   return (
//     <div className="user-summary">
//       <h3 className="--mt">Loom Stats</h3>
//       <div className="info-summary">
//         <InfoBox
//           icon={icon1}
//           title={"Total Users"}
//           count={allLooms.length}
//           bgColor="card1"
//         />
//         <InfoBox
//           icon={icon2}
//           title={"Verified Users"}
//           count={approvedLooms}
//           bgColor="card2"
//         />
//         <InfoBox
//           icon={icon3}
//           title={"Unverified Users"}
//           count={pendingLooms}
//           bgColor="card3"
//         />
//         <InfoBox
//           icon={icon4}
//           title={"Suspended Users"}
//           count={suspendedLooms}
//           bgColor="card4"
//         />
//       </div>
//     </div>
//   );
// };

// export default LoomStats;
