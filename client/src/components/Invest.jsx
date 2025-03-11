import React from 'react'
import bg_contact from "../assets/bg_contact.png"

const Invest = () => {

  // --------------------------------------------- RENDERING THE INVEST COMPONENT --------------------------------------------- //
  return (
    <div 
    // This is to give the background image to the invest page
    style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bg_contact})`, backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundSize: "cover", backgroundPosition: "center" }} className='px-[7%] min-h-screen w-full bg-black flex flex-col items-center justify-center text-white pt-[70px] '>

      <div className='flex flex-col items-center justify-center border-none container'>
        <h1 className='my-[10px] text-[40px] font-bold'>Basics Of Investing</h1>
        {/* What is Investment */}
        <div className='my-[15px] hover:shadow-[0_0_15px_white] rounded-[20px]'>
          <h3 className='bg-[#4b0082] text-white text-[20px] font-[500] py-[10px] px-[25px] rounded-tr-[20px] rounded-tl-[20px]'>What is Investment ?</h3>
          <p className='p-[15px] border-2 border-t-0 border-[#4b0082] bg-transparent text-[#dddddd] text-justify tracking-[0.3px] rounded-bl-[20px] rounded-br-[20px]'>Investing means committing money or capital to an asset, such as stocks, bonds, real estate, or mutual funds, with the expectation that its value will increase over time. Unlike saving money, which typically offers minimal returns, investing gives you the potential to generate higher returns, although with higher risk.<br />Investing involves putting your money to work to potentially grow your wealth over time. It can take many forms, such as stocks, bonds, real estate, or commodities.
            Investing allows your money to earn more money, potentially outpacing inflation and helping you reach your financial goals, whether it's saving for retirement, buying a home, or funding your children's education.<br />
            It's important to understand that investing involves risk, and there's no guarantee of profits. However, by conducting thorough research, diversifying your investments, and staying patient, you can increase your chances of achieving your financial objectives.
            Remember that investing is a long-term endeavor, and it's crucial to develop a sound investment strategy that aligns with your risk tolerance and financial goals.</p>
        </div>

        <h1 className='my-[10px] text-[40px] font-bold'>Different Types of Investing</h1>
        {/* Stocks */}
        <div className='my-[15px] hover:shadow-[0_0_15px_white] rounded-[20px]'>
          <h3 className='bg-[#4b0082] text-white text-[20px] font-[500] py-[10px] px-[25px] rounded-tr-[20px] rounded-tl-[20px]'>Stocks</h3>
          <p className='p-[15px] border-2 border-t-0 border-[#4b0082] bg-transparent text-[#dddddd] text-justify  tracking-[0.3px] rounded-bl-[20px] rounded-br-[20px]'>Stocks are simply an investment method to build wealth. When you invest in the stock of a company, it means you own a share in the company that issued the stock.Stock investment is a way to invest in some of the most successful companies.Also, there are different types of stocks available in the market to invest/trade-in. These stocks are categorised based on the following criteria:<br />
            1.Market capitalization<br />
            2.Ownership<br />
            3.Fundamentals<br />
            4.Price volatility<br />
            5.Profit sharing<br />
            6.Economic trends

            <div className='my-[15px] hover:shadow-[0_0_10px_white] rounded-[20px]'>
              <h3 className='bg-[#4b0082] text-white text-[20px] font-[500] py-[10px] px-[25px] rounded-tr-[20px] rounded-tl-[20px]'>What is Stock Market ?</h3>
              <p className='p-[15px] border-2 border-t-0 border-[#4b0082] bg-transparent text-[#dddddd] text-justify tracking-[0.3px] rounded-bl-[20px] rounded-br-[20px]'>People often wonder what is stock market and share market, and often use it interchangeably.A stock market is similar to a share market. A share market is where the shares are issued or traded in. The primary difference between the two is that the stock market lets an individual trade in bonds, mutual funds, derivatives, shares of a company, etc. On the other hand, a share market only allows the trading of shares.
              </p>
            </div>

            <div className='my-[15px] hover:shadow-[0_0_10px_white] rounded-[20px]'>
              <h3 className='bg-[#4b0082] text-white text-[20px] font-[500] py-[10px] px-[25px] rounded-tr-[20px] rounded-tl-[20px]'>How Does the Stock Market Work?</h3>
              <p className='p-[15px] border-2 border-t-0 border-[#4b0082] bg-transparent text-[#dddddd] text-justify tracking-[0.3px] rounded-bl-[20px] rounded-br-[20px]'>
                Companies raise money on the stock market by selling ownership stakes to investors. These equity stakes are known as shares of stock.<br />

                By listing shares for sale on the stock exchanges that make up the stock market, companies get access to the capital they need to operate and expand their businesses without having to take on debt. Investors benefit by exchanging their money for shares on the stock market.<br />

                As companies put that money to grow and expand their businesses, it profits the investors as their shares of stock become more valuable over time, leading to capital gains. In addition, companies pay dividends to their shareholders as their profits grow.<br />

                The performances of individual stocks vary widely over time but taken as a whole, the stock market has historically rewarded investors with average annual returns of around 10%, making it one of the most reliable ways of growing your money.</p>
            </div>

            <div className='my-[15px] hover:shadow-[0_0_10px_white] rounded-[20px]'>
              <h3 className='bg-[#4b0082] text-white text-[20px] font-[500] py-[10px] px-[25px] rounded-tr-[20px] rounded-tl-[20px]'>Diffetent types of Stocks </h3>
              <p className='p-[15px] border-2 border-t-0 border-[#4b0082] bg-transparent text-[#dddddd] text-justify tracking-[0.3px] rounded-bl-[20px] rounded-br-[20px]'>
                <strong>1. Categorization Criteria: Market Capitalization</strong><br />
                Market capitalization is a way to classify stocks based on their size. Large-cap stocks are generally more valuable than mid-cap or small-cap stocks, and therefore command a higher price.<br />

                The classification of stocks is based on their market capitalization (market cap). A stock's market cap is a measure of the total value of its outstanding shares.<br />

                <b>Large Cap :</b>The top 100 companies in terms of market capitalization. These are the market stalwarts and famous brand names. They also tend to pay good dividends to their shareholders.<br />

                These companies generally have large market caps and are often considered to be more stable and less risky than mid-cap and small-cap stocks. They are also considered to be more mature compared to other stocks because their performance has been more consistent over time.<br />

                <b>Mid Cap :</b>Those ranking between 101 and 250 in the list of companies as per market capitalization. These are growing companies that have been around for some time and with a sizable customer base.Mid-cap companies tend to have higher growth rates, but they're also more sensitive to economic cycles and industry trends, so they can be less predictable than large-cap stocks.<br />


                <b>Small Cap :</b>All the remaining companies. The major chunk of the market consists of small-cap companies.<br />

                While some of them offer huge growth potential, others fail to survive the economic volatility. Small-cap stocks tend to have higher volatility than the other two categories because they're lower on the totem pole when it comes to size and liquidity.<br />
                <strong>2.Categorization Criteria: Ownership</strong><br />
                Stocks are classified according to their ownership. Preferred stocks offer a higher dividend, while common and hybrid stocks do not.<br />

                The classification of a stock depends on its rights and privileges: the preferred stock has more rights than common stock, while hybrid stocks have all the rights of common stock and none of the privileges.<br />

                <b>Common Stocks :</b>It offers ownership in the company with voting rights to elect the board of directors.<br />

                Stockholders having common stocks are eligible to receive a part of the company’s profits via dividends. These are the most common types of stock in India.<br />

                <b>Preffered Stocks :</b>It also offers ownership in the company but doesn’t come with the same voting rights as common stocks. These stocks receive promised dividends that are not available with common stocks.<br />

                Also, if the company liquidates, then these stocks get preference over common stocks.<br />
                <strong>3.Categorization Criteria: Fundamentals</strong><br />
                While the market price of a stock depends on the demand and supply of the said stock in the market, most investors assess the financials of the company before buying its stock.<br />

                Understanding the intrinsic value helps determine how much the market price deviates from the true value of the price of a share in the said company. Based on fundamentals, there are two types of stocks:<br />

                <b>Overvalued Stocks:</b>These are stocks that have a market price that cannot be justified by their earnings outlook. Hence, the market price of such stocks is higher than their intrinsic value.<br />

                <b>Undervalued Stocks</b>These stocks have a market price lower than their intrinsic value.<br />

              </p>
            </div>

          </p>
        </div>

        {/* Mutual Funds */}
        <div className='my-[15px] hover:shadow-[0_0_15px_white] rounded-[20px]'>
          <h3 className='bg-[#4b0082] text-white text-[20px] font-[500] py-[10px] px-[25px] rounded-tr-[20px] rounded-tl-[20px]'>Mutual Funds</h3>
          <p className='p-[15px] border-2 border-t-0 border-[#4b0082] bg-transparent text-[#dddddd] text-justify tracking-[0.3px] rounded-bl-[20px] rounded-br-[20px]'>A mutual fund is a collective investment vehicle that collects & pools money from a number of investors and invests the same in equities, bonds, government securities, money market instruments.<br />

            The money collected in mutual fund scheme is invested by professional fund managers in stocks and bonds etc. in line with a scheme’s investment objective. The income / gains generated from this collective investment scheme are distributed proportionately amongst the investors, after deducting applicable expenses and levies, by calculating a scheme’s “Net Asset Value” or NAV. In return, mutual fund charges a small fee.<br />

            In short, mutual fund is a collective pool of money contributed by several investors and managed by a professional Fund Manager.<br />

            Mutual Funds in India are established in the form of a Trust under Indian Trust Act, 1882, in accordance with SEBI (Mutual Funds) Regulations, 1996.<br />

            The fees and expenses charged by the mutual funds to manage a scheme are regulated and are subject to the limits specified by SEBI.<br />

            <div className='my-[15px] hover:shadow-[0_0_10px_white] rounded-[20px]'>
              <h3 className='bg-[#4b0082] text-white text-[20px] font-[500] py-[10px] px-[25px] rounded-tr-[20px] rounded-tl-[20px]'>How a mutual fund works?</h3>
              <p className='p-[15px] border-2 border-t-0 border-[#4b0082] bg-transparent text-[#dddddd] text-justify tracking-[0.3px] rounded-bl-[20px] rounded-br-[20px]'>One should avoid the temptation to review the fund's performance each time the market falls or jumps up significantly. For an actively-managed equity scheme, one must have patience and allow reasonable time - between 18 and 24 months - for the fund to generate returns in the portfolio.<br />

                When you invest in a mutual fund, you are pooling your money with many other investors. Mutual fund issues “Units” against the amount invested at the prevailing NAV. Returns from a mutual fund may include income distributions to investors out of dividends, interest, capital gains or other income earned by the mutual fund. You can also have capital gains (or losses) if you sell the mutual fund units for more (or less) than the amount you invested.<br />

                Mutual funds are ideal for investors who –<br />
                1. lack the knowledge or skill / experience of investing in stock markets directly.<br />
                2. want to grow their wealth, but do not have the inclination or time to research the stock market.<br />
                3. wish to invest only small amounts.
              </p>
            </div>

            <div className='my-[15px] hover:shadow-[0_0_10px_white] rounded-[20px]'>
              <h3 className='bg-[#4b0082] text-white text-[20px] font-[500] py-[10px] px-[25px] rounded-tr-[20px] rounded-tl-[20px]'>Why invest in Mutual Funds?</h3>
              <p className='p-[15px] border-2 border-t-0 border-[#4b0082] bg-transparent text-[#dddddd] text-justify tracking-[0.3px] rounded-bl-[20px] rounded-br-[20px]'>As investment goals vary from person to person – post-retirement expenses, money for children’s education or marriage, house purchase, etc. – the investment products required to achieve these goals too vary. Mutual funds provide certain distinct advantages over investing in individual securities. Mutual funds offer multiple choices for investment across equity shares, corporate bonds, government securities, and money market instruments, providing an excellent avenue for retail investors to participate and benefit from the uptrends in capital markets. The main advantages are that you can invest in a variety of securities for a relatively low cost and leave the investment decisions to a professional manager.</p>
            </div>

          </p>
        </div>

        {/* Intraday Trading */}
        <div className='my-[15px] hover:shadow-[0_0_15px_white] rounded-[20px]'>
          <h3 className='bg-[#4b0082] text-white text-[20px] font-[500] py-[10px] px-[25px] rounded-tr-[20px] rounded-tl-[20px]'>Intraday Trading</h3>
          <p className='p-[15px] border-2 border-t-0 border-[#4b0082] bg-transparent text-[#dddddd] text-justify tracking-[0.3px] rounded-bl-[20px] rounded-br-[20px]'>Intraday trading, often referred to as day trading, involves buying and selling financial instruments such as stocks, commodities, or currencies within the same trading day. The primary objective is to capitalize on short-term price movements and earn quick profits. Unlike traditional investing, intraday traders close all their positions by the end of the trading session to avoid overnight risks or market uncertainties.

            <div className='my-[15px] hover:shadow-[0_0_10px_white] rounded-[20px]'>
              <h3 className='bg-[#4b0082] text-white text-[20px] font-[500] py-[10px] px-[25px] rounded-tr-[20px] rounded-tl-[20px]'>Key Features of Intraday Trading</h3>
              <p className='p-[15px] border-2 border-t-0 border-[#4b0082] bg-transparent text-[#dddddd] text-justify tracking-[0.3px] rounded-bl-[20px] rounded-br-[20px]'>Intraday trading stands out due to its unique characteristics. All transactions, including both buying and selling, are completed within the same day, ensuring no positions are carried forward. Traders typically focus on assets with high liquidity to ensure easy entry and exit points. This trading style relies heavily on technical analysis, with traders using charts, indicators, and patterns to make informed decisions. Additionally, many brokers provide leverage, allowing traders to control larger positions with smaller capital—though this also increases the risks involved.</p>
            </div>

            <div className='my-[15px] hover:shadow-[0_0_10px_white] rounded-[20px]'>
              <h3 className='bg-[#4b0082] text-white text-[20px] font-[500] py-[10px] px-[25px] rounded-tr-[20px] rounded-tl-[20px]'>Advantages of Intraday Trading</h3>
              <p className='p-[15px] border-2 border-t-0 border-[#4b0082] bg-transparent text-[#dddddd] text-justify tracking-[0.3px] rounded-bl-[20px] rounded-br-[20px]'>One of the significant advantages of intraday trading is the opportunity to earn quick profits, sometimes within minutes or hours. By closing positions daily, traders avoid the risks associated with overnight market changes, such as geopolitical events or unexpected news. Intraday trading also offers capital efficiency, as leverage allows traders to magnify their potential returns. Moreover, it helps develop strong analytical skills due to the need for constant market monitoring and swift decision-making.</p>
            </div>

            <div className='my-[15px] hover:shadow-[0_0_10px_white] rounded-[20px]'>
              <h3 className='bg-[#4b0082] text-white text-[20px] font-[500] py-[10px] px-[25px] rounded-tr-[20px] rounded-tl-[20px]'>Risks of Intraday Trading</h3>
              <p className='p-[15px] border-2 border-t-0 border-[#4b0082] bg-transparent text-[#dddddd] text-justify tracking-[0.3px] rounded-bl-[20px] rounded-br-[20px]'>Despite its benefits, intraday trading comes with considerable risks. The high volatility of financial markets can lead to significant losses, especially if trades are not managed effectively. Leverage, while amplifying profits, also increases potential losses. Additionally, intraday trading requires constant attention to the market, which can be emotionally taxing and stressful. Frequent trades also result in higher brokerage fees, which can eat into overall profits if not carefully monitored.</p>
            </div>

            <div className='my-[15px] hover:shadow-[0_0_10px_white] rounded-[20px]'>
              <h3 className='bg-[#4b0082] text-white text-[20px] font-[500] py-[10px] px-[25px] rounded-tr-[20px] rounded-tl-[20px]'>Important Tips for Intraday Trading</h3>
              <p className='p-[15px] border-2 border-t-0 border-[#4b0082] bg-transparent text-[#dddddd] text-justify tracking-[0.3px] rounded-bl-[20px] rounded-br-[20px]'>Success in intraday trading requires discipline and strategy. Always trade in highly liquid stocks to ensure quick transactions. Set predefined profit targets and stop-loss levels to limit potential losses and secure gains. Use technical indicators like moving averages, RSI, and Bollinger Bands to identify market trends and entry points. Staying updated with market news and announcements is crucial, as they can significantly impact stock prices. Lastly, effective risk management is essential—never risk more than a small percentage of your capital on a single trade to protect against substantial losses.</p>
            </div>

            <div className='my-[15px] hover:shadow-[0_0_10px_white] rounded-[20px]'>
              <h3 className='bg-[#4b0082] text-white text-[20px] font-[500] py-[10px] px-[25px] rounded-tr-[20px] rounded-tl-[20px]'>Common Strategies for Intraday Trading</h3>
              <p className='p-[15px] border-2 border-t-0 border-[#4b0082] bg-transparent text-[#dddddd] text-justify tracking-[0.3px] rounded-bl-[20px] rounded-br-[20px]'>Several strategies can be employed for intraday trading. Scalping focuses on making small, frequent profits by exploiting minute price gaps. Momentum trading involves identifying stocks with strong price movements and trading in the direction of the trend. Breakout trading is based on entering positions when a stock price breaks through resistance or support levels. On the other hand, reversal trading identifies potential trend reversals and capitalizes on them.

              </p>
            </div>

          </p>
        </div>

        {/* Gold Investments */}
        <div className='my-[15px] hover:shadow-[0_0_15px_white] rounded-[20px]'>
          <h3 className='bg-[#4b0082] text-white text-[20px] font-[500] py-[10px] px-[25px] rounded-tr-[20px] rounded-tl-[20px]'>Gold Investement</h3>
          <p className='p-[15px] border-2 border-t-0 border-[#4b0082] bg-transparent text-[#dddddd] text-justify tracking-[0.3px] rounded-bl-[20px] rounded-br-[20px]'>There are a plethora of precious metals, but gold is placed in high regard as an investment. Due to some influencing factors such as high liquidity and inflation-beating capacity, gold is one of the most preferred investments in India.<br />

            Gold investment can be done in many forms like buying jewelry, coins, bars, gold exchange-traded funds, Gold funds, sovereign gold bond scheme, etc.<br />

            Though there are times when markets see a fall in the prices of gold but usually it doesn’t last for long and always makes a strong upturn. Once you have made your mind to invest in gold, you should decide the way of investing meticulously.<br />

            If you want to know more about Gold Investment plans and other facts like different ways to buy and invest in gold, how to invest in gold online and much more, you are at the right place.

            <div className='my-[15px] hover:shadow-[0_0_10px_white] rounded-[20px]'>
              <h3 className='bg-[#4b0082] text-white text-[20px] font-[500] py-[10px] px-[25px] rounded-tr-[20px] rounded-tl-[20px]'>What are the Different Ways of Investing in Gold?</h3>
              <p className='p-[15px] border-2 border-t-0 border-[#4b0082] bg-transparent text-[#dddddd] text-justify tracking-[0.3px] rounded-bl-[20px] rounded-br-[20px]'>Traditionally, the only way to invest in gold was by purchasing jewellery. Over the years, different ways of owning gold have emerged including different variants of physical gold and paper gold along with its variants.<br />

                Here are some ways in which you can invest in gold:<br />

                <b>1. Digital Gold</b><br />
                One of the most convenient and cost-effective ways of investing in gold online is Digital Gold. This product allows you to buy and sell gold in fractions at any time. You can invest in gold with as little as Rs.10!<br />

                Every bit of digital gold purchased by you is backed by physical 24k gold and linked to the real-time gold prices.<br />

                <b>2. Gold Coins or Bars</b><br />
                To save on ‘making charges’ that are applicable to gold jewelry, many investors opt for gold coins or bars. Since these coins/bars do not require skilled artistry, the making charges are not applicable.<br />

                Today, you can buy these coins or bars from jewelers, banks, ecommerce websites, and many non-banking finance companies.<br />

                <b>3. Gold Savings Schemes</b><br />
                Jewelers across India offer various schemes to help people invest in gold in installments.<br />

                Typically, a jeweler allows you to deposit a pre-determined amount every month for a specific period. At the end of the tenure, they can buy gold from the same jeweler at a value equal to the amount deposited plus a bonus (if offered by the jeweler).<br />

                The gold can be purchased at the prevalent gold price on maturity.<br />

                <b>4. Gold Sovereign Bonds</b><br />
                Issued by the Reserve bank of India (RBI), Gold Sovereign Bonds are the safest way to purchase digital gold. The RBI issues them on behalf of the Indian Government. These bonds have an assured interest of 2.50% per annum.<br />

                The bonds have a lock-in period of five years and an overall tenure of eight years.<br />

                <b>5. Gold Mutual Funds</b><br />
                These funds invest in gold reserves directly or indirectly. They invest usually invest in stocks of mining companies, physical gold, and stocks of gold producing and distribution syndicates. The performance of these funds is usually linked with the performance of gold prices in the country.<br />

                <b>6. Gold Exchange Traded Funds (ETFs)</b>
                These are ETFs that invest in gold as an asset class and allow you to trade the units on the stock exchange. They carry the pros and cons of ETFs with the benefit of investing in gold.<br />

                <b>7. Jewelry</b><br />
                As Indians, we love owning gold jewelry. Whether it is for religious, cultural, or financial reasons, gold jewelry has always found a place in most households in our country. However, being a valuable metal, the safety of the jewelry is of high concern to investors.<br />

                Further, gold jewelry includes making charges which can go up to 25 percent if the design is intricate. These making charges are irrecoverable once you decide to sell the jewelry
              </p>
            </div>

          </p>
        </div>

        {/* Exchange Traded Funds (ETF's) */}
        <div className='my-[15px] hover:shadow-[0_0_15px_white] rounded-[20px]'>
          <h3 className='bg-[#4b0082] text-white text-[20px] font-[500] py-[10px] px-[25px] rounded-tr-[20px] rounded-tl-[20px]'>Exchange Traded Funds</h3>
          <p className='p-[15px] border-2 border-t-0 border-[#4b0082] bg-transparent text-[#dddddd] text-justify tracking-[0.3px] rounded-bl-[20px] rounded-br-[20px]'>An exchange-traded fund (ETF) is a collection of investments such as equities or bonds. ETFs will let you invest in a large number of securities at once, and they often have cheaper fees than other types of funds. ETFs are also more easily traded.<br />

          However, ETFs, like any other financial product, is not a one-size-fits-all solution. Examine them on their own merits, including management charges and commission fees, ease of purchase and sale, fit into your existing portfolio, and investment quality.

            <div className='my-[15px] hover:shadow-[0_0_10px_white] rounded-[20px]'>
              <h3 className='bg-[#4b0082] text-white text-[20px] font-[500] py-[10px] px-[25px] rounded-tr-[20px] rounded-tl-[20px]'>How do ETFs Work?</h3>
              <p className='p-[15px] border-2 border-t-0 border-[#4b0082] bg-transparent text-[#dddddd] text-justify tracking-[0.3px] rounded-bl-[20px] rounded-br-[20px]'>The assets that are underlying are owned by the fund provider, who then forms a fund to track the performance and offers shares in that fund to investors. Shareholders own a part of an ETF but not the fund's assets.<br />

                Investors in an ETF that tracks a stock index may get lump dividend payments or reinvestments for the index's constituent firms.<br />

                Here's a quick rundown of how ETFs work-<br />

                1. An ETF provider takes into account the universe of assets, such as stocks, bonds, commodities, or currencies, and builds a basket of them, each with its own ticker.<br />
                2. Investors can buy a share in that basket in the same way they would buy stock in a firm.<br />
                3. Like a stock, buyers and sellers trade the ETF on an exchange throughout the day.</p>
            </div>

          </p>
        </div>

      </div>

    </div>
  )
}

export default Invest
