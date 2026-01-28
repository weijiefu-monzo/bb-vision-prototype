"use client";

import {
  Button,
  IconButton,
  PageHeader,
  PageSection,
  Box,
  DetailHeader,
  Chip,
  Avatar,
  DataCard,
  Pill,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableTitleCell,
  Icon,
} from "@/components";
import styles from "./page.module.css";

export default function DesignSystemPage() {
  return (
    <div className={styles.container}>
      <PageHeader
        title="Design System"
        description="A comprehensive guide to all components and their variants."
      />

      {/* Buttons Section */}
      <PageSection
        title="Buttons"
        description="Buttons are used to trigger actions. They come in primary and secondary variants."
      >
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
      </PageSection>

      {/* Icon Buttons Section */}
      <PageSection
        title="Icon Buttons"
        description="Icon buttons are compact buttons that contain only an icon. They come in primary, secondary, and tertiary variants."
      >
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
      </PageSection>

      {/* Page Header Section */}
      <PageSection
        title="Page Header"
        description="Page headers provide context and navigation for page content. They include an optional back button, title, and description."
      >
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
      </PageSection>

      {/* Page Section Section */}
      <PageSection
        title="Page Section"
        description="Page sections organize content into distinct areas with optional headers, icons, and trailing elements."
      >
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
      </PageSection>

      {/* Box Section */}
      <PageSection
        title="Box"
        description="Box containers provide a consistent way to display content with primary background and elevation shadow."
      >
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
      </PageSection>

      {/* Detail Header Section */}
      <PageSection
        title="Detail Header"
        description="Detail headers provide context for detail panels. They render an h2 title and include an optional back button and description."
      >
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
      </PageSection>

      {/* Chip Section */}
      <PageSection
        title="Chip"
        description="Chips are compact elements that display an icon and label. They can be selected and are used for filtering, tagging, or selection."
      >
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
      </PageSection>

      {/* Avatar Section */}
      <PageSection
        title="Avatar"
        description="Avatars display user or entity images or initials. They come in small, medium, and large sizes."
      >
        <div className={styles.subsection}>
          <h3>Avatar with Image</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Small</p>
              <Avatar
                image="/assets/ElementalCore.png"
                name="Elemental Core"
                size="small"
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Medium</p>
              <Avatar
                image="/assets/ElementalCore.png"
                name="Elemental Core"
                size="medium"
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Large</p>
              <Avatar
                image="/assets/ElementalCore.png"
                name="Elemental Core"
                size="large"
              />
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Avatar with Initials</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Small</p>
              <Avatar name="John Doe" size="small" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Medium</p>
              <Avatar name="Jane Smith" size="medium" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Large</p>
              <Avatar name="Acme Corporation" size="large" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Custom Initials</p>
              <Avatar initials="AB" size="medium" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Single Word</p>
              <Avatar name="Monzo" size="medium" />
            </div>
          </div>
        </div>
      </PageSection>

      {/* DataCard Section */}
      <PageSection
        title="DataCard"
        description="Data cards display key metrics and information with optional severity indicators for positive, warning, and negative states."
      >
        <div className={styles.subsection}>
          <h3>Basic DataCard</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Label and Value</p>
              <DataCard label="Total Revenue" value="£125,000" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Caption</p>
              <DataCard
                label="Active Users"
                value="1,234"
                caption="Last 30 days"
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Large Value</p>
              <DataCard label="Total Balance" value="£2.5m" />
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>DataCard with Severity</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Positive</p>
              <DataCard
                label="Growth Rate"
                value="+18%"
                severity="positive"
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Warning</p>
              <DataCard
                label="Risk Level"
                value="2 payments"
                caption="require attention"
                severity="warning"
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Negative</p>
              <DataCard
                label="Overdue"
                value="£5,200"
                severity="negative"
              />
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>DataCard with Graph</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Graph Placeholder</p>
              <DataCard
                label="Monthly Trends"
                value="£45,000"
                graph={
                  <div
                    style={{
                      height: "60px",
                      background: "linear-gradient(90deg, #248a3d 0%, #30db5b 100%)",
                      borderRadius: "4px",
                    }}
                  />
                }
              />
            </div>
          </div>
        </div>
      </PageSection>

      {/* Pill Section */}
      <PageSection
        title="Pill"
        description="Pills are compact badges that display status, categories, or tags with optional icons and severity-based styling."
      >
        <div className={styles.subsection}>
          <h3>Basic Pills</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Label Only</p>
              <Pill label="Default" severity="default" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Icon</p>
              <Pill label="Pro" severity="default" icon="navigation_star" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Icon Only</p>
              <Pill icon="navigation_star" severity="default" />
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Pill Severities</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Default</p>
              <Pill label="Invoice" severity="default" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Positive</p>
              <Pill label="Approved" severity="positive" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Warning</p>
              <Pill label="Pending" severity="warning" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Negative</p>
              <Pill label="Rejected" severity="negative" />
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Pill Examples</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Status - Approved</p>
              <Pill label="Approved" severity="positive" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Status - Pending</p>
              <Pill label="Pending" severity="warning" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Payment Type</p>
              <Pill label="Recurring" severity="default" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>With Icon</p>
              <Pill
                label="Premium"
                severity="default"
                icon="navigation_star"
              />
            </div>
          </div>
        </div>
      </PageSection>

      {/* Table Section */}
      <PageSection
        title="Table"
        description="Tables organize data into rows and columns. They support title cells with avatars, right-aligned quantitative data, and row interactions."
      >
        <div className={styles.subsection}>
          <h3>Basic Table</h3>
          <div className={styles.componentExample} style={{ width: "100%" }}>
            <p className={styles.label}>Default Table</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Name</TableHeaderCell>
                  <TableHeaderCell align="right">Amount</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Acme Corporation</TableCell>
                  <TableCell align="right">£12,500.00</TableCell>
                  <TableCell>
                    <Pill label="Approved" severity="positive" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tech Solutions Ltd</TableCell>
                  <TableCell align="right">£8,750.00</TableCell>
                  <TableCell>
                    <Pill label="Pending" severity="warning" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Global Services Inc</TableCell>
                  <TableCell align="right">£45,200.00</TableCell>
                  <TableCell>
                    <Pill label="Approved" severity="positive" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Table with Title Cells</h3>
          <div className={styles.componentExample} style={{ width: "100%" }}>
            <p className={styles.label}>Table with Avatars</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Recipient</TableHeaderCell>
                  <TableHeaderCell align="right">Amount</TableHeaderCell>
                  <TableHeaderCell>Project</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableTitleCell
                    title="Acme Corporation"
                    avatar={<Avatar name="Acme Corporation" />}
                  />
                  <TableCell align="right">£12,500.00</TableCell>
                  <TableCell>Q4 Marketing Campaign</TableCell>
                </TableRow>
                <TableRow>
                  <TableTitleCell
                    title="Tech Solutions Ltd"
                    avatar={<Avatar name="Tech Solutions Ltd" />}
                    caption="Website Redesign"
                  />
                  <TableCell align="right">£8,750.00</TableCell>
                  <TableCell>Website Redesign</TableCell>
                </TableRow>
                <TableRow>
                  <TableTitleCell
                    title="Global Services Inc"
                    avatar={<Avatar name="Global Services Inc" />}
                  />
                  <TableCell align="right">£45,200.00</TableCell>
                  <TableCell>Infrastructure Upgrade</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Table Variants</h3>
          <div className={styles.componentExample} style={{ width: "100%" }}>
            <p className={styles.label}>Full Width Table</p>
            <Table fullWidth>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Item</TableHeaderCell>
                  <TableHeaderCell align="right">Price</TableHeaderCell>
                  <TableHeaderCell align="right">Quantity</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Product A</TableCell>
                  <TableCell align="right">£99.99</TableCell>
                  <TableCell align="right">5</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Product B</TableCell>
                  <TableCell align="right">£149.99</TableCell>
                  <TableCell align="right">3</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </PageSection>

      {/* Icon Section */}
      <PageSection
        title="Icon"
        description="Icons are visual symbols used throughout the interface. They come in various sizes and can be colored using semantic tokens."
      >
        <div className={styles.subsection}>
          <h3>Icon Sizes</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>X-Small</p>
              <Icon name="general_home" size="x-small" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Small</p>
              <Icon name="general_home" size="small" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Medium</p>
              <Icon name="general_home" size="medium" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Large</p>
              <Icon name="general_home" size="large" />
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Icon Examples</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Home</p>
              <Icon name="general_home" size="medium" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Chart</p>
              <Icon name="general_chart_bar_line" size="medium" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Task</p>
              <Icon name="general_task" size="medium" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Settings</p>
              <Icon name="action_plus" size="medium" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Payment</p>
              <Icon name="money_cheque" size="medium" />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Invoice</p>
              <Icon name="money_invoice_envelope" size="medium" />
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3>Icon Colors</h3>
          <div className={styles.componentGrid}>
            <div className={styles.componentExample}>
              <p className={styles.label}>Primary</p>
              <Icon
                name="general_home"
                size="medium"
                color="content-primary"
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Secondary</p>
              <Icon
                name="general_home"
                size="medium"
                color="content-secondary"
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Positive</p>
              <Icon
                name="general_home"
                size="medium"
                color="content-positive"
              />
            </div>
            <div className={styles.componentExample}>
              <p className={styles.label}>Negative</p>
              <Icon
                name="general_home"
                size="medium"
                color="content-negative"
              />
            </div>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
