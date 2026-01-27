"use client";

import {
  Button,
  IconButton,
  PageHeader,
  PageSection,
  Box,
  DetailHeader,
  Chip,
} from "@/components";
import styles from "./page.module.css";

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
          Buttons are used to trigger actions. They come in primary and
          secondary variants.
        </p>

        <div className={styles.subsection}>
          <h3>Primary Buttons - Large</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Default</p>
              <Button variant="primary" size="large">
                Primary Button
              </Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Leading Icon</p>
              <Button variant="primary" size="large" leadingIcon="general_home">
                Primary Button
              </Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Trailing Icon</p>
              <Button
                variant="primary"
                size="large"
                trailingIcon="navigation_xmark"
              >
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
              <Button variant="primary" size="medium">
                Primary Button
              </Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Leading Icon</p>
              <Button
                variant="primary"
                size="medium"
                leadingIcon="general_home"
              >
                Primary Button
              </Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Trailing Icon</p>
              <Button
                variant="primary"
                size="medium"
                trailingIcon="navigation_xmark"
              >
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
              <Button variant="secondary" size="large">
                Secondary Button
              </Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Leading Icon</p>
              <Button
                variant="secondary"
                size="large"
                leadingIcon="general_home"
              >
                Secondary Button
              </Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Trailing Icon</p>
              <Button
                variant="secondary"
                size="large"
                trailingIcon="navigation_xmark"
              >
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
              <Button variant="secondary" size="medium">
                Secondary Button
              </Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Leading Icon</p>
              <Button
                variant="secondary"
                size="medium"
                leadingIcon="general_home"
              >
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
              <Button variant="tertiary" size="large">
                Tertiary Button
              </Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Leading Icon</p>
              <Button
                variant="tertiary"
                size="large"
                leadingIcon="general_home"
              >
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
              <Button variant="tertiary" size="medium">
                Tertiary Button
              </Button>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Leading Icon</p>
              <Button
                variant="tertiary"
                size="medium"
                leadingIcon="general_home"
              >
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
          Icon buttons are compact buttons that contain only an icon. They come
          in primary, secondary, and tertiary variants.
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

      {/* Page Header Section */}
      <div className={styles.section}>
        <h2>Page Header</h2>
        <p className={styles.sectionDescription}>
          Page headers provide context and navigation for page content. They
          include an optional back button, title, and description.
        </p>

        <div className={styles.subsection}>
          <h3>Basic Page Header</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Title Only</p>
              <PageHeader title="Dashboard" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Text Description</p>
              <PageHeader
                title="Settings"
                description="Manage your account preferences and settings"
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With ReactNode Description</p>
              <PageHeader
                title="Profile"
                description={
                  <div>
                    <p>Welcome back, John!</p>
                    <p style={{ marginTop: "8px", fontSize: "14px" }}>
                      Last updated: 2 hours ago
                    </p>
                  </div>
                }
              />
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Page Header with Back Button</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Back Button</p>
              <PageHeader
                title="Edit Profile"
                description="Update your personal information"
                onBack={() => {}}
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Custom Back Label</p>
              <PageHeader
                title="Settings"
                description="Configure your preferences"
                onBack={() => {}}
                backButtonAriaLabel="Return to previous page"
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Back Button Only</p>
              <PageHeader title="Details" onBack={() => {}} />
            </div>
          </div>
        </div>
      </div>

      {/* Page Section Section */}
      <div className={styles.section}>
        <h2>Page Section</h2>
        <p className={styles.sectionDescription}>
          Page sections organize content into distinct areas with optional
          headers, icons, and trailing elements.
        </p>

        <div className={styles.subsection}>
          <h3>Basic Page Section</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Title Only</p>
              <PageSection title="Account Overview">
                <p>This is the content area of the section.</p>
              </PageSection>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Description</p>
              <PageSection
                title="Transactions"
                description="View and manage your recent transactions"
              >
                <p>Transaction content goes here.</p>
              </PageSection>
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Page Section with Icon</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Icon</p>
              <PageSection
                title="Savings"
                description="Track your savings goals"
                icon="general_chart_bar_line"
              >
                <p>Savings content goes here.</p>
              </PageSection>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Icon Only (No Description)</p>
              <PageSection title="Payments" icon="action_plus">
                <p>Payment content goes here.</p>
              </PageSection>
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Page Section with Trailing Element</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Button</p>
              <PageSection
                title="Projects"
                description="Manage your active projects"
                trailing={
                  <Button variant="secondary" size="medium">
                    View All
                  </Button>
                }
              >
                <p>Projects content goes here.</p>
              </PageSection>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Icon Button</p>
              <PageSection
                title="Settings"
                description="Configure your preferences"
                trailing={
                  <IconButton
                    variant="secondary"
                    size="medium"
                    icon="action_plus"
                    iconSize="small"
                    aria-label="Add"
                  />
                }
              >
                <p>Settings content goes here.</p>
              </PageSection>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Full Featured</p>
              <PageSection
                title="Insights"
                description="View your financial insights"
                icon="general_chart_bar_line"
                trailing={
                  <Button variant="primary" size="medium">
                    Explore
                  </Button>
                }
              >
                <p>Insights content goes here.</p>
              </PageSection>
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Page Section Variants</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Max Width (Default)</p>
              <PageSection
                title="Limited Width"
                description="This section has a maximum width constraint"
              >
                <p>Content is constrained to max-width.</p>
              </PageSection>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Full Width</p>
              <PageSection
                title="Full Width"
                description="This section spans the full width"
                hasMaxWidth={false}
              >
                <p>Content spans the full available width.</p>
              </PageSection>
            </div>
          </div>
        </div>
      </div>

      {/* Box Section */}
      <div className={styles.section}>
        <h2>Box</h2>
        <p className={styles.sectionDescription}>
          Box containers provide a consistent way to display content with
          primary background and elevation shadow.
        </p>

        <div className={styles.subsection}>
          <h3>Basic Box</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Default (With Padding)</p>
              <Box>
                <p>This is a box with default padding.</p>
                <p
                  style={{
                    marginTop: "8px",
                    fontSize: "14px",
                    color: "var(--semantic-content-secondary)",
                  }}
                >
                  Content inside the box
                </p>
              </Box>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>No Padding</p>
              <Box noPadding>
                <div style={{ padding: "16px" }}>
                  <p>This box has no padding by default.</p>
                  <p
                    style={{
                      marginTop: "8px",
                      fontSize: "14px",
                      color: "var(--semantic-content-secondary)",
                    }}
                  >
                    Padding is applied manually to inner content
                  </p>
                </div>
              </Box>
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Custom Content</p>
              <Box>
                <div>
                  <h3
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "18px",
                      fontWeight: 600,
                    }}
                  >
                    Card Title
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      color: "var(--semantic-content-secondary)",
                    }}
                  >
                    This box can contain any content structure.
                  </p>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Header Section */}
      <div className={styles.section}>
        <h2>Detail Header</h2>
        <p className={styles.sectionDescription}>
          Detail headers provide context for detail panels. They render an h2
          title and include an optional back button and description.
        </p>

        <div className={styles.subsection}>
          <h3>Basic Detail Header</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Title Only</p>
              <DetailHeader title="Details" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Text Description</p>
              <DetailHeader
                title="Task Details"
                description="View and edit task information"
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With ReactNode Description</p>
              <DetailHeader
                title="Project Overview"
                description={
                  <div>
                    <p>Last updated: 2 hours ago</p>
                    <p style={{ marginTop: "4px", fontSize: "14px" }}>
                      Status: Active
                    </p>
                  </div>
                }
              />
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Detail Header with Back Button</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Back Button</p>
              <DetailHeader
                title="Edit Item"
                description="Update item details"
                onBack={() => {}}
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Custom Back Label</p>
              <DetailHeader
                title="Settings"
                description="Configure preferences"
                onBack={() => {}}
                backButtonAriaLabel="Close detail panel"
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Back Button Only</p>
              <DetailHeader title="Information" onBack={() => {}} />
            </div>
          </div>
        </div>
      </div>

      {/* Chip Section */}
      <div className={styles.section}>
        <h2>Chip</h2>
        <p className={styles.sectionDescription}>
          Chips are compact elements that display an icon and label. They can be
          selected and are used for filtering, tagging, or selection.
        </p>

        <div className={styles.subsection}>
          <h3>Basic Chips</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Default</p>
              <Chip icon="general_home" label="Home" onClick={() => {}} />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Different Icon</p>
              <Chip
                icon="general_chart_bar_line"
                label="Analytics"
                onClick={() => {}}
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Long Label</p>
              <Chip
                icon="general_task"
                label="Project Management"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Chip States</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Unselected</p>
              <Chip
                icon="general_home"
                label="Home"
                selected={false}
                onClick={() => {}}
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Selected</p>
              <Chip
                icon="general_home"
                label="Home"
                selected={true}
                onClick={() => {}}
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Selected with Different Icon</p>
              <Chip
                icon="general_chart_bar_line"
                label="Insights"
                selected={true}
                onClick={() => {}}
              />
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Chip Icon Sizes</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Small Icon</p>
              <Chip
                icon="general_home"
                label="Home"
                iconSize="small"
                onClick={() => {}}
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Medium Icon</p>
              <Chip
                icon="general_home"
                label="Home"
                iconSize="medium"
                onClick={() => {}}
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Large Icon</p>
              <Chip
                icon="general_home"
                label="Home"
                iconSize="large"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Chip Examples</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Filter Chip</p>
              <Chip
                icon="general_chart_bar_line"
                label="Active"
                selected={true}
                onClick={() => {}}
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Tag Chip</p>
              <Chip
                icon="general_task"
                label="In Progress"
                selected={false}
                onClick={() => {}}
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Category Chip</p>
              <Chip
                icon="money_cheque"
                label="Payments"
                selected={true}
                onClick={() => {}}
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Status Chip</p>
              <Chip
                icon="general_pot"
                label="Savings"
                selected={false}
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
