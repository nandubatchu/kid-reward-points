import { motion, useReducedMotion } from 'motion/react'
import type { Transaction } from '../ledger'

const format = (value: number) => new Intl.NumberFormat('en-IN').format(value)

export function EarnCelebration({ transaction, balance, milestone, onHome }: { transaction: Transaction, balance: number, milestone?: number, onHome: () => void }) {
  const reducedMotion = useReducedMotion()
  return <section className="earn-celebration" aria-labelledby="celebration-title">
    <div className="earn-celebration__scene" aria-hidden="true">
      {!reducedMotion && <><motion.div className="earn-celebration__swipe" initial={{ x: '-120%', opacity: 0, rotate: -28 }} animate={{ x: '110%', opacity: [0, 1, 0], rotate: -28 }} transition={{ delay: .25, duration: .6, ease: 'easeOut' }}/>{Array.from({ length: 8 }, (_, index) => <motion.span key={index} className="earn-celebration__coin" style={{ left: `${20 + index * 9}%`, top: `${30 + (index % 3) * 13}%` }} initial={{ opacity: 0, scale: .4, y: 8 }} animate={{ opacity: [0, 1, 0], scale: [0.4, 1, .8], y: [8, -35 - index * 4, -95] }} transition={{ delay: .5 + index * .06, duration: 1.1 }}>✦</motion.span>)}</>}
      {milestone && !reducedMotion && Array.from({length: 12}, (_, index) => <motion.span key={`confetti-${index}`} className="earn-celebration__confetti" style={{ left: `${8 + index * 7}%`, top: `${12 + (index % 4) * 7}%`, background: index % 3 === 0 ? '#69e5e7' : index % 3 === 1 ? '#f7d476' : '#fb8182' }} initial={{ opacity: 0, y: 0, rotate: 0 }} animate={{ opacity: [0, 1, 0], y: [0, 65 + index * 4], rotate: 170 + index * 28 }} transition={{ delay: .65 + index * .035, duration: 1.35 }}/>) }
      <motion.img src={`${import.meta.env.BASE_URL}hero/mascot.webp`} alt="" initial={reducedMotion ? false : { scale: .82, rotate: -8, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 210, damping: 18 }}/>
      <span className="earn-celebration__halo"/>
    </div>
    <span className="hero-label">SAVED & VERIFIED</span><h1 id="celebration-title">Mission<br/><em>complete!</em></h1><p className="earn-celebration__points">+{format(transaction.points_delta)} <span>POINTS EARNED</span></p>{milestone && <p className="earn-celebration__milestone">✦ {milestone} mission milestone unlocked</p>}<p className="earn-celebration__reason">{transaction.description}</p><div className="earn-celebration__balance"><span>NEW POWER BALANCE</span><strong>{format(balance)} <small>PTS</small></strong></div><button className="primary" onClick={onHome}>Continue the adventure <span>→</span></button>
  </section>
}
