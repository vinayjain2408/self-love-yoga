import { TopBar } from '@/components';
import Footer from '@/components/Footer';
import { getAuthReq } from '@/utils/apiHandlers';
import React, { useState, useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

const Notification = () => {
  const [noteData, setNoteData] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const loadedPages = useRef(new Set());
  const timerRef = useRef(null);

  const fetchNotifications = async (pageToLoad) => {
    if (loadingRef.current || loadedPages.current.has(pageToLoad)) {
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(async () => {
      loadingRef.current = true;
      setLoading(true);

      try {
        const res = await getAuthReq(
          `/notifications?skip=${pageToLoad * 50}&take=50`,
        );

        if (res?.status) {
          const newData = res?.data?.data || [];

          if (newData.length > 0) {
            setNoteData((prev) => [...prev, ...newData]);
          }

          setHasMore(newData.length === 50);
        } else {
          setHasMore(false);
        }

        loadedPages.current.add(pageToLoad);
        setPage(pageToLoad + 1);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setHasMore(false);
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    }, 300);
  };

  useEffect(() => {
    fetchNotifications(0);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleLoadMore = () => {
    if (!loadingRef.current && hasMore && !loadedPages.current.has(page)) {
      fetchNotifications(page);
    }
  };

  return (
    <div className="px-4">
      <TopBar />
      <section className="mt-6">
        <div className="pb-20">
          <h2 className="font-inter font-bold text-16 leading-[16px]">
            Notification
          </h2>
          <div className="mt-6 flex flex-col items-center">
            {noteData.length > 0 ? (
              <div className="w-full">
                <InfiniteScroll
                  pageStart={0}
                  loadMore={handleLoadMore}
                  hasMore={hasMore && !loadingRef.current}
                  loader={
                    <div
                      className="text-white py-4 text-sm text-center w-full"
                      key={0}
                    >
                      Loading...
                    </div>
                  }
                  threshold={800}
                  useWindow={true}
                >
                  {noteData.map((msg) => (
                    <div
                      key={msg.id}
                      className="relative flex items-center justify-between bg-[#FFFFFF1A] shadow-inner-white text-white p-[5px] rounded-md shadow-[#FFFFFF75] w-full mb-4 border border-gray-600"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={`${process.env.IMAGE_KIT}/images/profileicon.svg`}
                          alt="profileicon"
                          className="w-12 h-12 rounded-full border border-gray-500"
                        />
                        <div>
                          <p className="text-white text-sm my-2 leading-[14px] font-inter font-bold">
                            {msg.title}
                          </p>
                          <p className="text-gray-400 text-sm leading-[16px] font-inter font-normal">
                            {msg.body}
                          </p>
                        </div>
                      </div>
                      <div className="text-gray-400 font-inter font-light text-xs ">
                        <p className="absolute right-2 top-[2px]">
                          {new Date(msg.createdAt)
                            .toLocaleDateString('en-GB')
                            .replace(/\//g, '-')}
                        </p>
                        <p className="absolute right-2 top-4">
                          {new Date(msg.createdAt).toLocaleTimeString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </InfiniteScroll>
              </div>
            ) : loading ? (
              <div className="text-white py-4 text-sm">Loading...</div>
            ) : (
              <p className="text-center text-white my-4">No notification</p>
            )}
          </div>
        </div>
      </section>
      {/* <hr /> */}
      <Footer />
    </div>
  );
};

export default Notification;
