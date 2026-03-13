"use client"

import { ActivateAgentDialog } from "@/components/cards/activate-agent-dialog"
import { AnalyticsCard } from "@/components/cards/analytics-card"
import { AnomalyAlert } from "@/components/cards/anomaly-alert"
import { AssignIssue } from "@/components/cards/assign-issue"
import { BarChartCard } from "@/components/cards/bar-chart-card"
import { BarVisualizerCard } from "@/components/cards/bar-visualizer"
import { BookAppointment } from "@/components/cards/book-appointment"
import { CodespacesCard } from "@/components/cards/codespaces-card"
import { ContributionsActivity } from "@/components/cards/contributions-activity"
import { Contributors } from "@/components/cards/contributors"
import { EnvironmentVariables } from "@/components/cards/environment-variables"
import { FeedbackForm } from "@/components/cards/feedback-form"
import { FileUpload } from "@/components/cards/file-upload"
import { GithubProfile } from "@/components/cards/github-profile"
import { IconPreviewGrid } from "@/components/cards/icon-preview-grid"
import { InviteTeam } from "@/components/cards/invite-team"
import { Invoice } from "@/components/cards/invoice"
import { LiveWaveformCard } from "@/components/cards/live-waveform"
import { NoTeamMembers } from "@/components/cards/no-team-members"
import { NotFound } from "@/components/cards/not-found"
import { ObservabilityCard } from "@/components/cards/observability-card"
import { PieChartCard } from "@/components/cards/pie-chart-card"
import { ReportBug } from "@/components/cards/report-bug"
import { ShippingAddress } from "@/components/cards/shipping-address"
import { Shortcuts } from "@/components/cards/shortcuts"
import { SkeletonLoading } from "@/components/cards/skeleton-loading"
import { SleepReport } from "@/components/cards/sleep-report"
import { StyleOverview } from "@/components/cards/style-overview"
import { UIElements } from "@/components/cards/ui-elements"
import { UsageCard } from "@/components/cards/usage-card"
import { Visitors } from "@/components/cards/visitors"
import { WeeklyFitnessSummary } from "@/components/cards/weekly-fitness-summary"

export default function PreviewPage() {
  return (
    <div className="overflow-x-auto overflow-y-hidden bg-muted dark:bg-background">
      <div className="grid w-[2400px] grid-cols-7 items-start gap-4 p-4 md:w-[3000px] md:gap-10 *:[div]:gap-4 md:*:[div]:gap-10">
        <div className="flex flex-col gap-4 p-px md:gap-10">
          <StyleOverview />
          <div className="md:hidden">
            <UIElements />
          </div>
          <CodespacesCard />
          <BarVisualizerCard />
          <Invoice />
        </div>
        <div className="flex flex-col gap-4 p-px md:gap-10">
          <IconPreviewGrid />
          <div className="hidden w-full md:flex">
            <UIElements />
          </div>
          <ObservabilityCard />
          <Visitors />
          <Shortcuts />
        </div>
        <div className="flex flex-col gap-4 p-px md:gap-10">
          <EnvironmentVariables />
          <BarChartCard />
          <InviteTeam />
          <ActivateAgentDialog />
        </div>
        <div className="flex flex-col gap-4 p-px md:gap-10">
          <SkeletonLoading />
          <PieChartCard />
          <NoTeamMembers />
          <ReportBug />
          <Contributors />
        </div>
        <div className="flex flex-col gap-4 p-px md:gap-10">
          <FeedbackForm />
          <BookAppointment />
          <SleepReport />
          <GithubProfile />
        </div>
        <div className="flex flex-col gap-4 p-px md:gap-10">
          <AssignIssue />
          <WeeklyFitnessSummary />
          <FileUpload />
          <AnalyticsCard />
          <UsageCard />
          <ContributionsActivity />
        </div>
        <div className="flex flex-col gap-4 p-px md:gap-10">
          <AnomalyAlert />
          <LiveWaveformCard />
          <ShippingAddress />
          <NotFound />
        </div>
      </div>
    </div>
  )
}
