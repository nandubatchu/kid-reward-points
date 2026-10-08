import type { Transaction } from '../ledger'

const MILESTONES = [
  { count: 1, title: 'First Spark', icon: '✦', description: 'Complete your first mission' },
  { count: 5, title: 'Rising Hero', icon: '◇', description: 'Complete 5 missions' },
  { count: 10, title: 'Story Maker', icon: '★', description: 'Complete 10 missions' },
  { count: 25, title: 'Legend in Motion', icon: '◆', description: 'Complete 25 missions' },
]

export function Achievements({ rows, isDemo }: { rows: Transaction[], isDemo: boolean }) {
  const completed = rows.filter(row => row.type === 'EARN').length
  return <section className="achievements" aria-labelledby="achievements-title"><div className="achievements__heading"><div><span className="hero-label">YOUR JOURNEY</span><h2 id="achievements-title">Mission badges</h2></div><span>{completed} completed</span></div>{isDemo && <p className="achievements__demo">Preview badges from sample missions.</p>}<div className="achievements__grid">{MILESTONES.map(milestone => <div key={milestone.count} className={`achievement ${completed >= milestone.count ? 'is-unlocked' : 'is-locked'}`}><div className="achievement__icon" aria-hidden="true">{milestone.icon}</div><div><strong>{milestone.title}</strong><small>{milestone.description}</small></div><span className="achievement__state">{completed >= milestone.count ? 'UNLOCKED' : `${completed}/${milestone.count}`}</span></div>)}</div></section>
}
