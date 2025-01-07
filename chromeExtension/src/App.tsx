import { useEffect, useState, useCallback } from 'react';
import './App.css';
import { parseDomain, ParseResultType } from 'parse-domain';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { cn, fetchCoupouns } from './lib/utils';

function App() {
  const [coupons, setCoupons] = useState<string[]>([]);
  const [pageIcon, setPageIcon] = useState<string>('');
  const [domain, setDomain] = useState<string>('');
  const [copiedCoupons, setCopiedCoupons] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDomainParsing = useCallback(async (url: URL) => {
    const fullDomain = url.hostname.replace('www.', '');
    const parseResult = parseDomain(fullDomain);
    try {
      if (parseResult.type === ParseResultType.Listed) {
        const { domain, topLevelDomains } = parseResult;
        const actualDomain = `${domain}.${topLevelDomains.join('.')}`;
        console.log('Domain:', actualDomain);
        setDomain(actualDomain);
        setPageIcon(
          `https://www.google.com/s2/favicons?sz=64&domain=${actualDomain}`
        );
        await fetchCoupouns(actualDomain, setCoupons, setLoading);
      } else {
        console.error('Invalid domain');
      }
    } catch {
      console.error('Invalid domain');
    }
  }, []);
  const handleChromeTab = useCallback(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const tab = tabs[0];
        if (tab.url) {
          const url = new URL(tab.url);

          handleDomainParsing(url);
        }
      }
    });
  }, [handleDomainParsing]);
  useEffect(() => {
    if (!chrome.tabs) {
      const url = new URL(window.location.href.replace('www.', ''));
      url.search = '';

      handleDomainParsing(url);
    } else {
      handleChromeTab();
    }
  }, [handleChromeTab, handleDomainParsing]);

  const handleCopy = (coupon: string) => {
    navigator.clipboard.writeText(coupon).then(() => {
      setCopiedCoupons((prev) => [...prev, coupon]);

      setTimeout(() => {
        setCopiedCoupons((prev) => prev.filter((copied) => copied !== coupon));
      }, 2000);
    });
  };
  return (
    <div className="bg-gray-100 w-[350px] h-full overflow-y-auto">
      <div className="flex flex-row items-center justify-center gap-2 py-2">
        <img
          src="/icons/128beeReal.png"
          alt="beeReal"
          className="w-12 h-12 aspect-square"
        />
        <h1 className="font-bold text-4xl p-2 text-black">BeeReal</h1>
      </div>

      {loading ? (
        <p className="font-bold text-gray-700 text-xl text-center py-3 h-[50px]">
          Loading coupons...
        </p>
      ) : coupons.length === 0 ? (
        <p className="font-bold text-gray-700 text-xl text-center py-3 h-[50px]">
          No coupons found
        </p>
      ) : (
        <>
          <div className="bg-gray-200 flex flex-row gap-2 items-center py-3 px-3 mb-3">
            <img
              width={40}
              height={40}
              className="w-9 h-9"
              src={pageIcon}
              alt={domain}
            />
            <p className="font-bold text-gray-700 text-xl">{domain}</p>
          </div>
          <div className="bg-gray-50 border-t-2 border-t-gray-300">
            <p className="font-semibold text-gray-700 text-2xl mt-3 mb-4 px-3">
              Coupons
            </p>

            <div className="flex flex-col px-2 gap-3 max-h-[400px] overflow-y-auto py-2">
              {coupons.map((coupon) => (
                <Card
                  key={coupon}
                  className="flex flex-row justify-between items-center p-2 mx-2 hover:scale-[102%] transition-transform duration-300"
                >
                  <p className="font-semibold text-xl text-gray-700">
                    {coupon}
                  </p>
                  <Button
                    onClick={() => handleCopy(coupon)}
                    className={cn(
                      copiedCoupons.includes(coupon) ? 'bg-blue-700 ' : ''
                    )}
                  >
                    {copiedCoupons.includes(coupon) ? 'Copied!' : 'Copy'}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
