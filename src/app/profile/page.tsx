'use client';

import { useState } from 'react';
import { PageLayout, type NavState } from '@/components';
import styles from './page.module.css';

export default function ProfilePage() {
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
            <p>Profile</p>
            <button onClick={() => setNavState('expanded')}>Expanded</button>
            <button onClick={() => setNavState('collapsed')}>Collapsed</button>
            <button onClick={() => setNavState('floating')}>Floating</button>
          </div>
        }
        detailContent={
          <div className={styles.detailPlaceholder}>
            <h2>Profile Details</h2>
            <p>Profile detail content goes here</p>
          </div>
        }
      >
        <div className={styles.mainPlaceholder}>
          <h1>Profile</h1>
          <p>This is the profile page</p>
          <button onClick={() => setIsDetailOpen(!isDetailOpen)}>
            {isDetailOpen ? 'Close' : 'Open'} Detail Panel
          </button>
        </div>
      </PageLayout>
    </div>
  );
}
