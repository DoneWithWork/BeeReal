import { useEffect, useState } from 'react';
import './App.css';
import { parseDomain, ParseResultType } from 'parse-domain';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { cn } from './lib/utils';

function App() {
  const [coupons, setCoupons] = useState<string[]>([]);
  const [pageIcon, setPageIcon] = useState<string>('');
  const [domain, setDomain] = useState<string>('');
  const [copiedCoupons, setCopiedCoupons] = useState<string[]>([]); // Track copied coupons
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    const getCoupons = async (url: string) => {
      setLoading(true); // Set loading state
      try {
        const response = await fetch(
          `http://localhost:3000/api/coupons?url=${url}`
        );
        if (!response.ok) {
          console.error('Failed to fetch coupons');
          setCoupons([]);
          return;
        }
        const data = await response.json();
        console.log(data);
        setCoupons(data.codes || []);
      } catch (error) {
        console.error('Error fetching coupons:', error);
        setCoupons([]);
      } finally {
        setLoading(false); // Clear loading state
      }
    };

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const tab = tabs[0];
        if (tab.url) {
          const url = new URL(tab.url);
          const fullDomain = url.hostname.replace('www.', '');
          const parseResult = parseDomain(fullDomain);

          try {
            if (parseResult.type === ParseResultType.Listed) {
              const { domain, topLevelDomains } = parseResult;

              const actualDomain = `${domain}.${topLevelDomains.join('.')}`;
              setDomain(actualDomain);
              setPageIcon(
                `https://www.google.com/s2/favicons?sz=64&domain=${actualDomain}`
              );
              console.log(actualDomain);
              getCoupons(actualDomain);
            } else {
              console.error('Invalid domain');
              setCoupons([]);
            }
          } catch {
            console.error('Invalid domain');
            setCoupons([]);
          }
        }
      } else {
        setCoupons([]);
      }
    });
  }, []);

  const handleCopy = (coupon: string) => {
    navigator.clipboard.writeText(coupon).then(() => {
      setCopiedCoupons((prev) => [...prev, coupon]);

      setTimeout(() => {
        setCopiedCoupons((prev) => prev.filter((copied) => copied !== coupon));
      }, 2000);
    });
  };

  return (
    <div className="bg-gray-100 w-[350px]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-4xl p-2 text-black">BeeReal</h1>
      </div>
      {loading ? (
        <div>
          <p className="font-bold text-gray-700 text-xl text-center py-3 h-[50px]">
            Loading coupons...
          </p>
        </div>
      ) : coupons.length === 0 ? (
        <div>
          <p className="font-bold text-gray-700 text-xl text-center py-3 h-[50px]">
            No coupons found
          </p>
        </div>
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
