import type { Transaction } from './ledger'
export const mockRows: Transaction[] = [
 {id:'demo-1',created_at_iso:new Date(Date.now()-86400000).toISOString(),type:'EARN',points_delta:50,description:'Helped make lunch',actor_label:'Vrishi',approval_method:'demo',source_client_id:'demo',notes:''},
 {id:'demo-2',created_at_iso:new Date(Date.now()-3600000).toISOString(),type:'EARN',points_delta:5,description:'Brushed teeth',actor_label:'Vrishi',approval_method:'demo',source_client_id:'demo',notes:''},
 {id:'demo-3',created_at_iso:new Date().toISOString(),type:'REDEEM',points_delta:-20,description:'Sticker pack',actor_label:'Vrishi',approval_method:'demo',source_client_id:'demo',notes:''}
]
