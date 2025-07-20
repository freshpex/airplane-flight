import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  backLink?: string;
  backgroundImage?: string;
}

const PageLayout = ({ title, subtitle, children, backLink = '/', backgroundImage }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Header */}
        <motion.div 
          className={`text-white py-12 sm:py-16 ${backgroundImage ? 'relative' : 'bg-gradient-to-r from-purple-800 to-indigo-700'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={backgroundImage ? {
            backgroundImage: `linear-gradient(rgba(76, 29, 149, 0.8), rgba(67, 56, 202, 0.8)), url('${backgroundImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          } : undefined}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {backLink && (
              <Link to={backLink} className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            )}
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
            {subtitle && <p className="text-lg text-white/80">{subtitle}</p>}
          </div>
        </motion.div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
