import React from "react";

function Skeleton() {
  return (
    // <div>
    //   <div className="overflow-hidden relative space-y-5 rounded-2xl bg-gray-900 bg-gradient-to-r from-transparent via-gray-600 to-transparent p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:border-t before:border-gray-900 before:bg-gradient-to-r before:from-transparent before:via-gray-900 before:to-transparent">
    //     <div className="space-y-3">
    //       {/* <div className="h-3 rounded-lg bg-gray-600"></div>
    //       <div className="h-3 rounded-lg bg-gray-600"></div>
    //     <div className="h-3 rounded-lg bg-gray-600"></div> */}
    //     </div>
    //   </div>
    // </div>
    <div className="h-32 w-32 rounded-lg bg-gray-400 overflow-hidden relative space-y-5   bg-gradient-to-r from-transparent via-gray-00 to-transparent p-4 shadow-xl shadow-black/30  before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:border-t before:border-gray-600 before:bg-gradient-to-r before:from-transparent before:via-gray-600 before:to-transparent"></div>
  );
}

export default Skeleton;
