import ProfileClient from "@/src/components/profile/ProfileClient";

export default function Profile(params) {
   return (
    <ProfileClient />
   )
};



// 'use client'

// import { useEffect, useState } from "react"
// import Layout from "@/src/app/layout"
// import Navigation from "@/src/components/navigation/Navigation"
// import PageContainer from "@/src/components/containers/PageContainer"
// import Image from "next/image"
// import profileImage from '../../../public/images/profile_test_images/profile_test_image.jpg'
// import Card from "@/src/components/cards/Card"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { memberships } from "@/src/services/memberships"
// import { faCalendar } from "@fortawesome/free-regular-svg-icons"
// import { formatDate, formatTimestamp } from "../utils/formatters"
// import Button from "@/src/components/buttons/Button"
// import Heading from "@/src/components/headings/Heading"
// import Section from "@/src/components/sections/Section"

// export default function Profile() {
//   const [user, setUser] = useState<any>(null)
//   const [loading, setLoading] = useState(true)

//   const membershipId = 'premium'
//   const membership = memberships.find(
//     (membership) => membership.id === membershipId.toLowerCase()
//   )

//   const dateObj = new Date()
//   const date = dateObj.getDate()

//   useEffect(() => {
//     const loadDashboardData = async () => {
//       try {
//         const res = await fetch("http://127.0.0.1/dashboard", {
//           credentials: "include"
//         })

//         if (!res.ok) {
//           throw new Error("Not logged in")
//         }

//         const data = await res.json()
//         setUser(data)
//       } catch (err) {
//         console.error("Dashboard error:", err)
//         setUser(null)
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadDashboardData()
//   }, [])

//   if (loading) {
//     return (
//       <Layout>
//         <PageContainer>
//           <Navigation />
//           <p>Loading...</p>
//         </PageContainer>
//       </Layout>
//     )
//   }

//   return (
//     <Layout>
//       <PageContainer>
//         <Navigation />

//         {/* Section: Hero */}
//         <Section variant="profile_hero">
//           <Image
//             className="profile-image h-[90px] w-[90px] object-cover rounded-full"
//             height={100}
//             width={100}
//             src={profileImage}
//             alt="profile image"
//           />

//           <div>
//             <Heading>
//               <h1 className="text-2xl">
//                 Velkommen, {user?.first_name || "..."}
//               </h1>

//               <p className="text-sm">
//                 {user?.email}
//               </p>
//             </Heading>
//           </div>
//         </Section>

//         {/* Section: Information */}
//         <Section variant="profile_information">
//           <Card className="flex justify-between items-center">
//             <div>
//               <Heading variant="dashboard_card_topic_heading">
//                 Dit medlemskab
//               </Heading>

//               <Heading variant="membership_status_and_date_heading">
//                 {membership?.name}
//               </Heading>

//               <ul className="text-(--solid-white) mt-4 space-y-1 membership-type text-sm">
//                 <Heading>
//                   <h4>Fordele:</h4>
//                 </Heading>

//                 {membership?.features?.map((feature, index) => (
//                   <li className="font-normal" key={index}>
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <FontAwesomeIcon
//               icon={membership?.icon}
//               className="text-5xl text-(--splash-orange)"
//             />
//           </Card>

//           <Card className="flex justify-between items-center">
//             <div>
//               <Heading variant="dashboard_card_topic_heading">
//                 Seneste vask
//               </Heading>

//               <Heading variant="membership_status_and_date_heading">
//                 {formatDate({
//                   date: dateObj,
//                   dateTimeFormat: 'da-DK',
//                   dayFormat: 'numeric',
//                   monthFormat: 'long'
//                 })}
//               </Heading>

//               <p className="text-sm membership-perks text-(--solid-white) mt-2">
//                 Klokken{" "}
//                 <span className="time">
//                   {formatTimestamp({
//                     time: dateObj,
//                     dateTimeFormat: 'da-DK',
//                     hourFormat: '2-digit',
//                     minuteFormat: '2-digit'
//                   })}
//                 </span>
//               </p>
//             </div>

//             <div className="relative">
//               <div className="absolute top-[62%] left-[50%] -translate-[50%] date-container">
//                 <p className="text-xs flex flex-col text-center">
//                   <span className="date text-(--splash-orange)">
//                     {date}
//                   </span>
//                 </p>
//               </div>

//               <FontAwesomeIcon
//                 icon={faCalendar}
//                 className="text-[50px] text-(--splash-orange)"
//               />
//             </div>
//           </Card>
//         </Section>

//         {/* Sign Out */}
//         <Button variant="auth">
//           Log ud
//         </Button>

//       </PageContainer>
//     </Layout>
//   )
// }