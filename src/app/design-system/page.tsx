'use client';

import { Button, IconButton } from '@/components';
import styles from './page.module.css';

export default function DesignSystemPage() {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h1>Design System</h1>
        <p className={styles.description}>
          A comprehensive guide to all components and their variants.
        </p>
      </div>

      {/* Buttons Section */}
      <div className={styles.section}>
        <h2>Buttons</h2>
        <p className={styles.sectionDescription}>
          Buttons are used to trigger actions. They come in primary and secondary variants.
        </p>

        <div className={styles.subsection}>
          <h3>Primary Buttons - Large</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Default</p>
              <Button variant="primary" size="large">Primary Button</Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Leading Icon</p>
              <Button variant="primary" size="large" leadingIcon="general_home">
                Primary Button
              </Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Trailing Icon</p>
              <Button variant="primary" size="large" trailingIcon="navigation_xmark">
                Primary Button
              </Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Both Icons</p>
              <Button
                variant="primary"
                size="large"
                leadingIcon="general_home"
                trailingIcon="navigation_xmark"
              >
                Primary Button
              </Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Disabled</p>
              <Button variant="primary" size="large" disabled>
                Primary Button
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Primary Buttons - Medium</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Default</p>
              <Button variant="primary" size="medium">Primary Button</Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Leading Icon</p>
              <Button variant="primary" size="medium" leadingIcon="general_home">
                Primary Button
              </Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Trailing Icon</p>
              <Button variant="primary" size="medium" trailingIcon="navigation_xmark">
                Primary Button
              </Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Disabled</p>
              <Button variant="primary" size="medium" disabled>
                Primary Button
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Secondary Buttons - Large</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Default</p>
              <Button variant="secondary" size="large">Secondary Button</Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Leading Icon</p>
              <Button variant="secondary" size="large" leadingIcon="general_home">
                Secondary Button
              </Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Trailing Icon</p>
              <Button variant="secondary" size="large" trailingIcon="navigation_xmark">
                Secondary Button
              </Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Disabled</p>
              <Button variant="secondary" size="large" disabled>
                Secondary Button
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Secondary Buttons - Medium</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Default</p>
              <Button variant="secondary" size="medium">Secondary Button</Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Leading Icon</p>
              <Button variant="secondary" size="medium" leadingIcon="general_home">
                Secondary Button
              </Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Disabled</p>
              <Button variant="secondary" size="medium" disabled>
                Secondary Button
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Tertiary Buttons - Large</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Default</p>
              <Button variant="tertiary" size="large">Tertiary Button</Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Leading Icon</p>
              <Button variant="tertiary" size="large" leadingIcon="general_home">
                Tertiary Button
              </Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Disabled</p>
              <Button variant="tertiary" size="large" disabled>
                Tertiary Button
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Tertiary Buttons - Medium</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Default</p>
              <Button variant="tertiary" size="medium">Tertiary Button</Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Leading Icon</p>
              <Button variant="tertiary" size="medium" leadingIcon="general_home">
                Tertiary Button
              </Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Disabled</p>
              <Button variant="tertiary" size="medium" disabled>
                Tertiary Button
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Icon Buttons Section */}
      <div className={styles.section}>
        <h2>Icon Buttons</h2>
        <p className={styles.sectionDescription}>
          Icon buttons are compact buttons that contain only an icon. They come in primary, secondary, and tertiary variants.
        </p>

        <div className={styles.subsection}>
          <h3>Primary Icon Buttons - Large</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Default</p>
              <IconButton
                variant="primary"
                size="large"
                icon="general_home"
                iconSize="medium"
                aria-label="Home"
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Disabled</p>
              <IconButton
                variant="primary"
                size="large"
                icon="general_home"
                iconSize="medium"
                aria-label="Home"
                disabled
              />
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Primary Icon Buttons - Medium</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Default</p>
              <IconButton
                variant="primary"
                size="medium"
                icon="general_home"
                iconSize="small"
                aria-label="Home"
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Disabled</p>
              <IconButton
                variant="primary"
                size="medium"
                icon="general_home"
                iconSize="small"
                aria-label="Home"
                disabled
              />
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Secondary Icon Buttons - Large</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Default</p>
              <IconButton
                variant="secondary"
                size="large"
                icon="general_home"
                iconSize="medium"
                aria-label="Home"
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Disabled</p>
              <IconButton
                variant="secondary"
                size="large"
                icon="general_home"
                iconSize="medium"
                aria-label="Home"
                disabled
              />
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Secondary Icon Buttons - Medium</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Default</p>
              <IconButton
                variant="secondary"
                size="medium"
                icon="general_home"
                iconSize="small"
                aria-label="Home"
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Disabled</p>
              <IconButton
                variant="secondary"
                size="medium"
                icon="general_home"
                iconSize="small"
                aria-label="Home"
                disabled
              />
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Tertiary Icon Buttons - Large</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Default</p>
              <IconButton
                variant="tertiary"
                size="large"
                icon="general_home"
                iconSize="medium"
                aria-label="Home"
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Disabled</p>
              <IconButton
                variant="tertiary"
                size="large"
                icon="general_home"
                iconSize="medium"
                aria-label="Home"
                disabled
              />
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Tertiary Icon Buttons - Medium</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Default</p>
              <IconButton
                variant="tertiary"
                size="medium"
                icon="general_home"
                iconSize="small"
                aria-label="Home"
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Disabled</p>
              <IconButton
                variant="tertiary"
                size="medium"
                icon="general_home"
                iconSize="small"
                aria-label="Home"
                disabled
              />
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Icon Button Examples</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Close</p>
              <IconButton
                variant="primary"
                icon="navigation_xmark"
                iconSize="medium"
                aria-label="Close"
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Settings</p>
              <IconButton
                variant="secondary"
                icon="action_plus"
                iconSize="medium"
                aria-label="Settings"
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Chart</p>
              <IconButton
                variant="primary"
                icon="general_chart_bar_line"
                iconSize="medium"
                aria-label="Chart"
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Layout</p>
              <IconButton
                variant="secondary"
                icon="general_layout"
                iconSize="medium"
                aria-label="Layout"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
