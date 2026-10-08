import type { FormEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { Transaction } from '../ledger'

type Props = { transaction: Transaction, balance: number, pinEnabled: boolean, pin: string, busy: boolean, offline: boolean, onPin: (value: string) => void, onSubmit: (event: FormEvent) => void, onBack: () => void, onSetupPin: () => void }
const format = (value: number) => new Intl.NumberFormat('en-IN').format(value)

export function ApprovalScreen({ transaction, balance, pinEnabled, pin, busy, offline, onPin, onSubmit, onBack, onSetupPin }: Props) {
  const reducedMotion = useReducedMotion()
  const earn = transaction.points_delta > 0
  return <div className="adventure-screen approval-screen"><button className="back adventure-back" onClick={onBack}>← Edit request</button><section className="adventure-intro"><div className="adventure-intro__symbol approval-screen__shield" aria-hidden="true">◇</div><span className="hero-label">PARENT CHECKPOINT</span><h1>One last<br/><em>hero check</em></h1><p>A parent reviews and approves this request.</p></section>
    <div className="approval-summary"><div className="approval-summary__heading"><span>MISSION SUMMARY</span><span>{earn ? 'EARN' : 'REDEEM'}</span></div><div><span>Action</span><strong>{earn ? 'Earn points' : 'Redeem points'}</strong></div><div><span>Reason</span><strong>{transaction.description}</strong></div><div><span>Change</span><strong className={earn ? 'plus' : 'minus'}>{transaction.points_delta > 0 ? '+' : ''}{transaction.points_delta} pts</strong></div><div className="approval-summary__total"><span>New balance</span><strong>{format(balance + transaction.points_delta)} pts</strong></div></div>
    <div className="approval-methods"><span className="hero-label">APPROVAL METHOD</span><div className="approval-methods__grid"><div className="approval-methods__pin"><span aria-hidden="true">●●●●</span><strong>Device PIN</strong><small>Available now</small></div><div className="approval-methods__biometric" aria-disabled="true"><motion.span aria-hidden="true" animate={reducedMotion ? undefined : { opacity: [.45, 1, .45] }} transition={{ duration: 2.6, repeat: Infinity }}>◎</motion.span><strong>Fingerprint</strong><small>Not enabled</small></div></div></div>
    <p className="approval-screen__limitation">This device PIN is a family convenience check. It cannot prove who is entering it or prevent direct edits to the Google Sheet.</p>
    {pinEnabled ? <form className="approval-form approval-screen__form" onSubmit={onSubmit}><label htmlFor="approval-pin">Parent’s device PIN</label><input id="approval-pin" type="password" inputMode="numeric" pattern="[0-9]{6}" minLength={6} maxLength={6} autoComplete="off" value={pin} onChange={event => onPin(event.target.value)} required/><motion.button disabled={busy || offline} className="primary" type="submit" whileTap={reducedMotion ? undefined : { scale: .98 }}>{busy ? 'Saving and verifying…' : 'Confirm PIN and save points'} <span>→</span></motion.button></form> : <div className="pin-required"><p>A parent needs to set a 6-digit PIN on this device before points can be saved.</p><button className="primary" onClick={onSetupPin}>Set up device PIN <span>→</span></button></div>}
  </div>
}
