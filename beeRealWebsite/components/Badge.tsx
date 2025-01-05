import Link from 'next/link';
import React from 'react';

export default function Badge() {
  return (
    <Link
      href="https://github.com/DoneWithWork/BeeReal"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        alt="GitHub Repo stars"
        src="https://img.shields.io/github/stars/DoneWithWork/BeeReal?style=social&logo=Github&label=BeeReal&cacheSeconds=3600"
      />
    </Link>
  );
}
