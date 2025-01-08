import React from 'react';

export default function MaxWidthWrapper({ children }: React.PropsWithChildren) {
  return (
    <section className="max-w-[1300px] mx-auto w-full ">{children}</section>
  );
}
