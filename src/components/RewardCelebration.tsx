import { motion, useReducedMotion } from 'motion/react'
import type { Transaction } from '../ledger'
import { AnimatedCount } from './AnimatedCount'

const format = (value: number) => new Intl.NumberFormat('en-IN').format(value)

export function RewardCelebration({ transaction, balance, onHome }: { transaction: Transaction, balance: number, onHome: () => void }) {
  const reducedMotion = useReducedMotion()
  return <section className="reward-celebration" aria-labelledby="reward-title">
    <div className="reward-celebration__scene" aria-hidden="true">
      {!reducedMotion && Array.from({ length: 7 }, (_, index) => <motion.span key={index} className="reward-celebration__spark" style={{ left: `${17 + index * 11}%`, top: `${26 + (index % 3) * 17}%` }} initial={{ opacity: 0, scale: .3, y: 18 }} animate={{ opacity: [0, 1, 0], scale: [0.3, 1.2, .6], y: [18, -22, -70] }} transition={{ delay: .35 + index * .08, duration: 1.25 }}>✦</motion.span>)}
      <motion.img src={`${import.meta.env.BASE_URL}hero/treasure.webp`} alt="" initial={reducedMotion ? false : { opacity: 0, scale: .72, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 190, damping: 17 }}/>
    </div>
    <span className="hero-label">SAVED & VERIFIED</span><h1 id="reward-title">Reward<br/><em>unlocked!</em></h1><p className="reward-celebration__cost">{format(Math.abs(transaction.points_delta))} <span>POINTS REDEEMED</span></p><p className="reward-celebration__reason">{transaction.description}</p><div className="reward-celebration__balance"><span>POINTS REMAINING</span><strong><AnimatedCount from={balance - transaction.points_delta} value={balance}/> <small>PTS</small></strong></div><button className="primary" onClick={onHome}>Back to the adventure <span>→</span></button>
  </section>
}
