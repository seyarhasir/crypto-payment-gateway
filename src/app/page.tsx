// // src/app/page.tsx

// "use client";

// import Header from "@/components/Header";
// import Hero from "@/components/home/Hero";
// import Features from "@/components/home/Features";
// import Testimonials from "@/components/home/Testimonials";
// import CTA from "@/components/home/CTA";
// import Footer from "@/components/Footer";
// import Script from 'next/script';

// export default function Home() {
//   return (
//     <div className="bg-background text-foreground transition-colors duration-300">
//       {/* Google Analytics */}
//       <Script
//         strategy="afterInteractive"
//         src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
//       />
//       <Script id="google-analytics" strategy="afterInteractive">
//         {`
//           window.dataLayer = window.dataLayer || [];
//           function gtag(){dataLayer.push(arguments);}
//           gtag('js', new Date());
//           gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
//         `}
//       </Script>

//       {/* HubSpot Chat */}
//       <Script id="hubspot-chat" strategy="afterInteractive">
//         {`
//           (function(d,t){
//             var s = d.createElement(t), options = {
//               'id': 'YOUR_HUBSPOT_ID',
//               'parentNode': d.body
//             };
//             s.src = '//js.hs-scripts.com/YOUR_HUBSPOT_ID.js';
//             s.async = true;
//             s.defer = true;
//             d.body.appendChild(s);
//           })(document, 'script');
//         `}
//       </Script>

//       <Header />
//       <Hero />
//       <Features />
//       <Testimonials />
//       <CTA />
//       <Footer />
//     </div>
//   );
// }



// src/app/page.tsx
"use client";

import './globals.css';
import Header from "@/components/Header";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import Footer from "@/components/Footer";
import Script from 'next/script';

export default function Home() {
  return (
    <div className="bg-background text-foreground transition-colors duration-300">
      {/* ===== TEMPORARY TEST ELEMENT ===== */}
      <div className="bg-red-500 p-8 m-4 text-white text-xl font-bold">
        IF YOU SEE THIS RED BOX, CORE TAILWIND IS WORKING!
      </div>
      {/* ================================== */}

      {/* Google Analytics ... */}
      {/* HubSpot Chat ... */}

      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}