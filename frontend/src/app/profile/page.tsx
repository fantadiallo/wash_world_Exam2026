import Layout from "@/src/app/layout"
import Navigation from "@/src/components/navigation/Navigation"
import PageContainer from "@/src/components/containers/PageContainer"
import Image from "next/image"
import profileImage from '../../../public/images/profile_test_images/profile_test_image.jpg'
import Card from "@/src/components/cards/Card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { memberships } from "@/src/services/memberships"
import { faCalendar } from "@fortawesome/free-regular-svg-icons"
import { formatDate, formatTimestamp} from "../utils/formatters"
import Button from "@/src/components/buttons/Button"


export default function Profile()
{
      const membershipId = 'premium'
      const membership = memberships.find((membership) => membership.id === membershipId.toLowerCase())
      const dateObj = new Date()
      const date = dateObj.getDate()
      return (
        <Layout>
          <PageContainer>
              <Navigation />
              {/* Section: Hero */}
              <section className="profile-hero-container text-(--solid-white)">
                <div className="flex gap-4 items-center">
                    <Image
                      className="profile-image h-[90px] w-[90px] object-cover rounded-full"
                      height={100}
                      width={100}
                      src={profileImage}
                      alt="profile image"
                    />
                    <div>
                      <header className="text-2xl ">
                        <h1>Velkommen, Martin!</h1>
                      </header>
                      <p className="text-sm">
                        martin@gmail.com
                      </p>
                  </div>
                </div>
              </section>
              {/* Section: Information */}
              <section className="flex flex-col items-center gap-8 mt-4">
                  <Card className="flex justify-between items-center">
                    <div>
                      <header className="text-(--brand-green-dark-bg) uppercase">
                        <h3>Dit medlemskab</h3>
                        <h4 className="text-(--splash-orange) mt-1 membership-type text-2xl">
                          {membership?.name}
                        </h4>
                      </header>
                      <p className="text-sm membership-perks text-(--solid-white) mt-2">
                        {membership?.perks}
                      </p>
                    </div>
                    
                    <FontAwesomeIcon icon={membership?.icon} className="text-5xl text-(--splash-orange)" />
                  </Card>
                  <Card className="flex justify-between items-center">
                    <div>
                      <header className="text-(--brand-green-dark-bg) uppercase">
                        <h3>Seneste vask</h3>
                        <h4 className="text-(--splash-orange) mt-2 membership-type text-2xl">
                          {formatDate({ date: dateObj, dateTimeFormat: 'da-DK', dayFormat: 'numeric', monthFormat: 'long' })}
                        </h4>
                      </header>
                      <p className="text-sm membership-perks text-(--solid-white) mt-2">
                        Klokken <span className="time">{formatTimestamp({ time: dateObj, dateTimeFormat: 'da-DK', hourFormat: '2-digit', minuteFormat: '2-digit' })}</span>
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute top-[62%] left-[50%] -translate-[50%] date-container">
                        <p className="text-xs flex flex-col text-center">
                          <span className="date text-(--splash-orange)">{date}</span>
                        </p>
                      </div>
                      <FontAwesomeIcon
                        icon={faCalendar}
                        className="text-[50px] text-(--splash-orange)"
                      />
                    </div>
                  </Card>
              </section>

              {/* Sign Out */}
              <section className="sign-out">
                <Button variant="auth">
                  Log ud
                </Button>
              </section>
          </PageContainer>
        </Layout>
      )
}