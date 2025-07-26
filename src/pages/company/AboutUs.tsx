import PageLayout from "@/components/layout/PageLayout";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <PageLayout
      title="About SkyWays"
      subtitle="Our story, vision, and commitment to excellence"
    >
      <div className="max-w-4xl">
        <section className="mb-12">
          <motion.h2
            className="text-2xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Our Story
          </motion.h2>
          <motion.p
            className="text-gray-700 mb-4 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Founded in 2005, SkyWays has grown from a small regional carrier to
            one of the world's most respected airlines. Our journey began with
            just three aircraft serving five destinations. Today, we connect
            passengers to over 160 destinations worldwide with a modern fleet of
            more than 200 aircraft.
          </motion.p>
          <motion.p
            className="text-gray-700 mb-4 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Throughout our growth, we've remained committed to our founding
            principles: exceptional service, operational excellence, and a
            genuine care for our passengers. Each year, millions of travelers
            choose SkyWays for their journeys, whether for business or pleasure.
          </motion.p>
        </section>

        <section className="mb-12">
          <motion.h2
            className="text-2xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            Our Vision
          </motion.h2>
          <motion.p
            className="text-gray-700 mb-4 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            At SkyWays, we envision a world where travel is not merely about
            moving from one place to another, but about creating meaningful
            experiences. We strive to make every journey with us memorable,
            comfortable, and seamless.
          </motion.p>
          <motion.p
            className="text-gray-700 mb-4 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Our vision extends beyond just flying aircraft. We aim to be a
            catalyst for global connections, bringing people, cultures, and
            ideas together. By doing so, we contribute to a more interconnected
            and understanding world.
          </motion.p>
        </section>

        <section className="mb-12">
          <motion.h2
            className="text-2xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            Awards and Recognition
          </motion.h2>
          <motion.p
            className="text-gray-700 mb-4 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            We're honored to have received numerous industry accolades,
            including "Best Airline in Customer Service" for five consecutive
            years, "Most On-Time Airline" for three years, and the prestigious
            "Five-Star Global Airline" rating from Skytrax.
          </motion.p>
          <motion.p
            className="text-gray-700 mb-4 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            These recognitions reflect our unwavering commitment to excellence
            in every aspect of our operations, from in-flight service to safety
            standards.
          </motion.p>
        </section>

        <section>
          <motion.h2
            className="text-2xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            Our Values
          </motion.h2>
          <motion.ul
            className="list-disc pl-5 space-y-2 text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <li>
              <strong>Safety First:</strong> The well-being of our passengers
              and crew is our top priority.
            </li>
            <li>
              <strong>Excellence:</strong> We strive for perfection in
              everything we do.
            </li>
            <li>
              <strong>Innovation:</strong> We continuously seek new ways to
              enhance the travel experience.
            </li>
            <li>
              <strong>Sustainability:</strong> We're committed to reducing our
              environmental footprint and operating responsibly.
            </li>
            <li>
              <strong>Diversity and Inclusion:</strong> We celebrate the unique
              perspectives and backgrounds of our team and passengers.
            </li>
          </motion.ul>
        </section>
      </div>
    </PageLayout>
  );
};

export default AboutUs;
