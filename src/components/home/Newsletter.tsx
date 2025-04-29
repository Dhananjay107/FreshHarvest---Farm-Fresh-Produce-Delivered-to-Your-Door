import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, you would send this to a backend service
      console.log(`Subscribing email: ${email}`);
      setSubscribed(true);
      setEmail('');
      
      // Reset the subscription message after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <section className="py-16 bg-green-50">
      <div className="container-custom">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <h2 className="font-poppins font-bold text-3xl text-gray-800 mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-600 mb-6">
                Stay updated with our latest products, seasonal specials, and healthy recipes delivered straight to your inbox.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary w-full"
                >
                  Subscribe Now
                </button>
                
                {subscribed && (
                  <div className="text-green-500 text-sm mt-2">
                    Thank you for subscribing! Check your email for confirmation.
                  </div>
                )}
                
                <p className="text-xs text-gray-500 mt-2">
                  By subscribing, you agree to receive marketing emails from us. You can unsubscribe at any time.
                </p>
              </form>
            </div>
            
            <div className="w-full md:w-1/2">
              <div className="h-full relative">
                <img
                  src="https://images.pexels.com/photos/7210150/pexels-photo-7210150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Fresh vegetables"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;