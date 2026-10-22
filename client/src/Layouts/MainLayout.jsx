import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;



























// import Navbar from "../Components/navbar";
// import Sidebar from "../Components/sidebar";

// function MainLayout({children}) {
//     return (
//         <div>
//             <Navbar />
//             <Sidebar />

//             <main>
//                 {children}
//             </main>
            
//         </div>
//     );
// }

// export default MainLayout;