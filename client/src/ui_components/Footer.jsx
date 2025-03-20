/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */

const Footer = () => {
  return (
    <footer className="container bg-[#F6F6F7] padding-x py-16 max-container dark:bg-zinc-900 border-t-4 mt-10">
      <div className="flex max-lg:gap-9 lg:gap-4 flex-wrap max-md:justify-center justify-between">
        <div className="w-[300px] flex flex-col gap-6 max-md:items-center">
          <h1 className="text-zinc-900bg-zinc-900 text-2xl dark:text-[#FFFFFF] flex items-center justify-center gap-15">
            Mihai Elisei
            <figure className="w-8 h-8 dark:w-12 dark:h-12">
              <img
                className="img-cover rounded-full"
                src="/images/logo.png"
                width={40}
                height={40}
                alt="Mihai Elisei"
              />
            </figure>
          </h1>

          <p className="text-[14px] text-[#696A75] leading-[1.5] max-md:text-center dark:text-[#97989F]">
            Unlock the power of creativity and innovation! Whether you're looking for expert insights, 
            industry trends, or strategies to grow your business, you're in the right place.  
          </p>
        </div>

        <div className="text-[#181A2A] text-[14px] flex flex-col gap-4 px-4 max-md:items-center">
          <p className="font-semibold text-[16px] dark:text-white">Quick Links</p>
          <ul className="flex flex-col gap-4 text-[#3B3C4A] max-md:items-center dark:text-[#97989F]">
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Portfolio</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="text-[#181A2A] text-[14px] flex flex-col gap-4 px-4 max-md:items-center">
          <p className="font-semibold text-[16px] dark:text-white">Categories</p>
          <ul className="flex flex-col gap-4 text-[#3B3C4A] max-md:items-center dark:text-[#97989F]">
            <li>Web Development</li>
            <li>Technology Trends</li>
            <li>Digital Marketing</li>
            <li>Business Growth</li>
            <li>Finance & Investment</li>
            <li>Entrepreneurship</li>
          </ul>
        </div>

        <div className="bg-white w-[350px] px-6 flex flex-col items-center justify-center gap-2 rounded-lg dark:bg-[#242535] py-6">
          <h3 className="font-semibold text-xl dark:text-white">
            📩 Join Our Exclusive Newsletter!
          </h3>
          <p className="text-[#696A75] text-[16px] mb-5 dark:text-[#97989F]">
            Stay ahead with the latest insights, tips, and strategies. Get exclusive updates directly in your inbox.
          </p>
          <div className="w-full relative">
            <input
              placeholder="Enter your email"
              className="border border-[#DCDDDF] rounded-sm h-[40px] px-3 py-3 w-full text-[14px] dark:bg-[#181A2A]"
            />
          </div>
          <button className="bg-[#4B6BFB] text-[#FFFFFF] text-[16px] rounded-md w-full py-3">
            Subscribe Now
          </button>
        </div>
      </div>

      <div className="py-3 flex items-center gap-6 cursor-pointer max-md:mt-6 max-md:justify-center"></div>
    </footer>
  );
};

export default Footer;