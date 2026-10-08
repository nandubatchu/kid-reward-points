import { motion, useReducedMotion } from 'motion/react'
import { AnimatedCount } from './AnimatedCount'
import type { Transaction } from '../ledger'

type Props = {
  name: string
  balance: number
  rows: Transaction[]
  isDemo: boolean
  onEarn: () => void
  onRedeem: () => void
  onHistory: () => void
  onConnect: () => void
}

const format = (value: number) => new Intl.NumberFormat('en-IN').format(value)

export function HeroHome({ name, balance, rows, isDemo, onEarn, onRedeem, onHistory, onConnect }: Props) {
  const reducedMotion = useReducedMotion()
  const earned = rows.filter(row => row.type === 'EARN')
  const earnedTotal = earned.reduce((sum, row) => sum + row.points_delta, 0)
  const missionCount = earned.length
  const nextMilestone = [1, 5, 10, 25, 50].find(target => target > missionCount)
  const lastMilestone = [0, 1, 5, 10, 25, 50].filter(target => target <= missionCount).at(-1) || 0
  const progress = nextMilestone ? ((missionCount - lastMilestone) / (nextMilestone - lastMilestone)) * 100 : 100
  const recent = [...rows].sort((a, b) => b.created_at_iso.localeCompare(a.created_at_iso)).slice(0, 3)
  return <div className="hero-home">
    <div className="hero-home__intro"><span className="hero-home__eyebrow"><span className="hero-home__signal"/> THE ADVENTURE CONTINUES</span><span className="hero-home__chapter">CHAPTER 01 · YOUR STORY</span></div>
    <section className="hero-stage" aria-labelledby="hero-title">
      <div className="hero-stage__stars" aria-hidden="true"/>
      <div className="hero-stage__copy"><span className="hero-stage__kicker">WELCOME BACK, HERO</span><h1 id="hero-title">{name}<br/><em>Points</em></h1><p>Every good deed writes a new legend.</p></div>
      <motion.img className="hero-stage__mascot" src={`${import.meta.env.BASE_URL}hero/mascot.webp`} alt="" aria-hidden="true" draggable={false} animate={reducedMotion ? undefined : { y: [0, -8, 0], rotate: [-1, 1, -1] }} transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}/>
      <div className="hero-stage__floor" aria-hidden="true"/>
      <div className="hero-stage__seal" aria-hidden="true">✦</div>
    </section>
    <motion.section className="hero-balance" initial={reducedMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }} aria-label="Current points balance">
      <div className="hero-balance__top"><span><span className="hero-balance__spark">✦</span> YOUR POWER BALANCE</span><span className="hero-balance__live"><i/> {isDemo ? 'SAMPLE LEDGER' : 'LIVE LEDGER'}</span></div>
      <div className="hero-balance__value"><AnimatedCount value={balance}/><small>PTS</small></div>
      <div className="hero-balance__footer"><span>1 point = ₹1</span><span>₹{format(balance)} reward value</span></div>
    </motion.section>
    <div className="hero-actions" aria-label="Choose an action">
      <motion.button className="hero-action hero-action--earn" onClick={onEarn} whileTap={reducedMotion ? undefined : { scale: .97 }} transition={{ type: 'spring', stiffness: 450, damping: 25 }}><span className="hero-action__icon">✦</span><span className="hero-action__copy"><small>NEW MISSION</small><strong>Earn points</strong><span>Complete a good deed</span></span><b aria-hidden="true">↗</b></motion.button>
      <motion.button className="hero-action hero-action--redeem" onClick={onRedeem} whileTap={reducedMotion ? undefined : { scale: .97 }} transition={{ type: 'spring', stiffness: 450, damping: 25 }}><span className="hero-action__icon">◈</span><span className="hero-action__copy"><small>REWARD VAULT</small><strong>Redeem</strong><span>Claim your treasure</span></span><b aria-hidden="true">↗</b></motion.button>
    </div>
    <section className="hero-progress" aria-label="Mission progress"><div className="hero-progress__head"><div><span className="hero-label">HERO JOURNEY</span><h2>{missionCount ? `${missionCount} mission${missionCount === 1 ? '' : 's'} complete` : 'Your story starts here'}</h2></div><span className="hero-progress__badge" aria-hidden="true">✦</span></div><p>{missionCount ? `${format(earnedTotal)} ${isDemo ? 'sample points from demo missions' : 'points earned through saved missions'}` : 'Complete your first mission to begin your journey.'}</p>{nextMilestone && <><div className="hero-progress__track"><motion.span initial={false} animate={{ width: `${progress}%` }} transition={{ duration: .6 }}/></div><div className="hero-progress__foot"><span>{missionCount} completed</span><span>Next milestone · {nextMilestone}</span></div></>}</section>
    <section className="hero-recent"><div className="hero-recent__head"><div><span className="hero-label">THE STORY SO FAR</span><h2>Recent activity</h2></div><button onClick={onHistory}>VIEW ALL <span aria-hidden="true">↗</span></button></div>{recent.length ? <div className="hero-recent__list">{recent.map(row => <div className="hero-recent__item" key={row.id}><span className={`hero-recent__icon ${row.points_delta >= 0 ? 'is-earn' : 'is-redeem'}`} aria-hidden="true">{row.points_delta >= 0 ? '✦' : '◈'}</span><div><strong>{row.description}</strong><small>{new Date(row.created_at_iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</small></div><b className={row.points_delta >= 0 ? 'plus' : 'minus'}>{row.points_delta > 0 ? '+' : ''}{row.points_delta}</b></div>)}</div> : <p className="hero-recent__empty">No points yet. Your first good deed can start the story!</p>}</section>
    {isDemo && <div className="demo-banner"><span>✦</span><p><strong>Trying it out?</strong><br/>These are sample points. Connect your family’s Google Sheet to save real entries.</p><button onClick={onConnect}>Connect</button></div>}
  </div>
}
