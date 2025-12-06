import { clsx } from "clsx";
import { Tweet } from "react-tweet";

const tweets = [
  "1853560800050651632",
  "1853242495540363750",
  "1853191842377941445",
  "1853201667480527032",
  "1853535228746489966",
  "1853172223533633623",
  "1853210238586876361",
  "1853246071566180575",
  "1853318197891490178",
  "1853202171350884569",
  "1853188496288100420",
  "1853183811195949065",
  "1853310553407762491",
  "1853556609030434979",
  "1853769403541639569",
  "1853436749650755708",
  "1853448825454592211",
  "1853434573339738583",
  "1853429177459905008",
  "1853423751464952051",
  "1853368337889100159",
  "1853367222946918616",
  "1853301610656698479",
  "1855655408112722325",
  "1855956182823014891",
  "1855656670346825737",
  "1856782547046600770",
  "1854993374207422474",
  "1853432188391305495",
  "1853595587167629730",
  "1853410692541641078",
  "1853250277006028983",
  "1854269038333153336",
  "1853539972953129259",
  "1857116301384454576",
  "1857165517032992870",
  "1857133756638797901",
  "1857107605136744735",
  "1856973107212259791",
  "1859478851513909690",
  "1857116639029874782",
  "1859898994148737286",
  "1863494562871746847",
  "1862904464715473405",
  "1865468239523807500",
  "1865474750320886046",
  "1864885640917356648",
  "1858758851798925812",
  "1873819850638016610",
  "1872679875796160528",
  "1866549472861491341",
  "1879219290001621387",
  "1874963073548845348",
  "1879220737669558711",
];

export const Social = () => (
  <section className="grid sm:grid-cols-3 sm:divide-x" id="community">
    <div className="hidden bg-dashed sm:block">
      <div className="sticky top-14 grid gap-2 p-8">
        <h2 className="font-semibold text-4xl">Loved by the community</h2>
        <p className="text-muted-foreground">
          See what people are saying about next-forge.
        </p>
      </div>
    </div>
    <div className="columns-1 gap-4 p-8 sm:col-span-2 md:columns-2">
      <style
        dangerouslySetInnerHTML={{
          __html: `
    .tweet-customizer-wrapper .react-tweet-theme {
  --tweet-container-margin: 1.5rem 0;
  
  /* Font Family */
  --tweet-font-family: 'Geist';
  
  /* Header */
  --tweet-header-font-size: 0.9375rem;
  --tweet-header-line-height: 1.25rem;
  
  /* Text */
  --tweet-body-font-size: 1.25rem;
  --tweet-body-font-weight: 400;
  --tweet-body-line-height: 1.5rem;
  --tweet-body-margin: 0;
  
  /* Quoted Tweet */
  --tweet-quoted-container-margin: 0.75rem 0;
  --tweet-quoted-body-font-size: 0.938rem;
  --tweet-quoted-body-font-weight: 400;
  --tweet-quoted-body-line-height: 1.25rem;
  --tweet-quoted-body-margin: 0.25rem 0 0.75rem 0;
  
  /* Info */
  --tweet-info-font-size: 0.9375rem;
  --tweet-info-line-height: 1.25rem;
  
  /* Actions */
  --tweet-actions-font-size: 0.875rem;
  --tweet-actions-line-height: 1rem;
  --tweet-actions-font-weight: 700;
  --tweet-actions-icon-size: 1.25em;
  --tweet-actions-icon-wrapper-size: calc(var(--tweet-actions-icon-size) + 0.75em);
  
  /* Reply button - automatically follows actions styling */
  --tweet-replies-font-size: 0.875rem;
  --tweet-replies-line-height: 1rem;
  --tweet-replies-font-weight: 700;
}

:where(.tweet-customizer-wrapper .react-tweet-theme) * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:is([data-theme='light'], .light) :where(.tweet-customizer-wrapper .react-tweet-theme),
:where(.tweet-customizer-wrapper .react-tweet-theme) {
  --tweet-skeleton-gradient: linear-gradient(270deg, rgb(245, 245, 245), rgb(230, 230, 230), rgb(230, 230, 230), rgb(245, 245, 245));
  --tweet-border: 1px solid rgb(229, 229, 229);
  --tweet-font-family: 'Geist';
  --tweet-font-color: rgb(10, 10, 10);
  --tweet-font-color-secondary: rgb(115, 115, 115);
  --tweet-bg-color: rgb(255, 255, 255);
  --tweet-bg-color-hover: rgb(255, 255, 255);
  --tweet-quoted-bg-color-hover: rgb(255, 255, 255);
  --tweet-color-blue-primary: rgb(0, 150, 255);
  --tweet-color-blue-primary-hover: rgba(0, 150, 255, 0.1);
  --tweet-color-blue-secondary: rgb(0, 112, 191);
  --tweet-color-blue-secondary-hover: rgba(0, 112, 191, 0.1);
  --tweet-color-green-primary: rgb(10, 10, 10);
  --tweet-color-green-primary-hover: rgba(10, 10, 10, 0.1);
  --tweet-color-red-primary: rgb(255, 30, 86);
  --tweet-color-red-primary-hover: rgba(255, 30, 86, 0.1);
  --tweet-twitter-icon-color: var(--tweet-font-color);
  --tweet-verified-old-color: rgb(130, 154, 171);
  --tweet-verified-blue-color: var(--tweet-color-blue-primary);
}

:is([data-theme='dark'], .dark) :where(.tweet-customizer-wrapper .react-tweet-theme) {
  --tweet-skeleton-gradient: linear-gradient(270deg, rgb(25, 25, 25), rgb(40, 40, 40), rgb(40, 40, 40), rgb(25, 25, 25));
  --tweet-border: 1px solid rgb(35, 35, 35);
  --tweet-font-family: 'Geist';
  --tweet-font-color: rgb(250, 250, 250);
  --tweet-font-color-secondary: rgb(161, 161, 161);
  --tweet-bg-color: rgb(10, 10, 10);
  --tweet-bg-color-hover: rgb(10, 10, 10);
  --tweet-quoted-bg-color-hover: rgb(10, 10, 10);
  --tweet-color-blue-primary: rgb(0, 150, 255);
  --tweet-color-blue-primary-hover: rgba(0, 150, 255, 0.1);
  --tweet-color-blue-secondary: rgb(0, 210, 255);
  --tweet-color-blue-secondary-hover: rgba(0, 210, 255, 0.1);
  --tweet-color-green-primary: rgb(250, 250, 250);
  --tweet-color-green-primary-hover: rgba(250, 250, 250, 0.1);
  --tweet-color-red-primary: rgb(255, 30, 86);
  --tweet-color-red-primary-hover: rgba(255, 30, 86, 0.1);
  --tweet-twitter-icon-color: var(--tweet-font-color);
  --tweet-verified-old-color: rgb(130, 154, 171);
  --tweet-verified-blue-color: #fff;
}

    `,
        }}
      />
      {tweets.map((tweet, index) => (
        <div
          className={clsx(index ? "" : "sm:-mt-6", "tweet-customizer-wrapper")}
          key={tweet}
        >
          <Tweet id={tweet} />
        </div>
      ))}
    </div>
  </section>
);
