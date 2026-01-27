'use client';

import { useState, useRef } from 'react';
import { PageLayout, type PageLayoutRef, type NavState } from '@/components';
import styles from './page.module.css';

export default function DashboardPage() {
  const [navState, setNavState] = useState<NavState>('expanded');
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <div className={styles.pageContainer}>
      <PageLayout
        navState={navState}
        isDetailOpen={isDetailOpen}
        onNavStateChange={setNavState}
        onDetailOpenChange={setIsDetailOpen}
        navContent={
          <div className={styles.navPlaceholder}>
            <h3>Nav</h3>
            <p>Dashboard</p>
            <button onClick={() => setNavState('expanded')}>Expanded</button>
            <button onClick={() => setNavState('collapsed')}>Collapsed</button>
            <button onClick={() => setNavState('floating')}>Floating</button>
          </div>
        }
        detailContent={
          <div className={styles.detailPlaceholder}>
            <h2>Dashboard Details</h2>
            <p>Dashboard detail content goes here</p>
          </div>
        }
      >
        <div className={styles.mainPlaceholder}>
          <h1>Dashboard</h1>
          <p>This is the dashboard page</p>
          <button onClick={() => setIsDetailOpen(!isDetailOpen)}>
            {isDetailOpen ? 'Close' : 'Open'} Detail Panel
          </button>
        </div>
      </PageLayout>
    </div>
  );
}
