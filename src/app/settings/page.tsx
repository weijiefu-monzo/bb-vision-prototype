'use client';

import { useState } from 'react';
import { PageLayout, type NavState } from '@/components';
import styles from './page.module.css';

export default function SettingsPage() {
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
            <p>Settings</p>
            <button onClick={() => setNavState('expanded')}>Expanded</button>
            <button onClick={() => setNavState('collapsed')}>Collapsed</button>
            <button onClick={() => setNavState('floating')}>Floating</button>
          </div>
        }
        detailContent={
          <div className={styles.detailPlaceholder}>
            <h2>Settings Details</h2>
            <p>Settings detail content goes here</p>
          </div>
        }
      >
        <div className={styles.mainPlaceholder}>
          <h1>Settings</h1>
          <p>This is the settings page</p>
          <button onClick={() => setIsDetailOpen(!isDetailOpen)}>
            {isDetailOpen ? 'Close' : 'Open'} Detail Panel
          </button>
        </div>
      </PageLayout>
    </div>
  );
}
