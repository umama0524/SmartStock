// ユーザー関連
export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  name: string;
  avatar?: string;
  createdAt: string;
}

export type UserRole = 
  | 'viewer'        // 閲覧のみ
  | 'inventory'     // 在庫担当
  | 'purchase'      // 発注担当
  | 'sales'         // 販売担当
  | 'approver'      // 承認者
  | 'admin';        // 管理者

// 認証関連
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

// 在庫関連
export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  description?: string;
  unitPrice: number;
  unit: string;
  reorderPoint: number;
  safetyStock: number;
  maxStock: number;
  leadTime: number; // 日数
  supplierId: string;
  supplierName: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Inventory {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number; // quantity - reservedQuantity
  locationId: string;
  locationName: string;
  lotNumber?: string;
  expiryDate?: string;
  unitCost: number;
  totalValue: number;
  lastInboundDate?: string;
  lastOutboundDate?: string;
  status: InventoryStatus;
  updatedAt: string;
  updatedBy: string;
}

export type InventoryStatus = 
  | 'normal'      // 正常
  | 'low'         // 発注点到達
  | 'critical'    // 安全在庫割れ
  | 'excess'      // 過剰在庫
  | 'stagnant';   // 滞留在庫

export interface InventoryTransaction {
  id: string;
  inventoryId: string;
  transactionType: TransactionType;
  quantity: number;
  balanceAfter: number;
  reasonCode: string;
  referenceId?: string;
  referenceType?: 'purchase' | 'sales' | 'adjustment';
  userId: string;
  userName: string;
  approvedBy?: string;
  approvedAt?: string;
  notes?: string;
  createdAt: string;
}

export type TransactionType = 
  | 'inbound'     // 入庫
  | 'outbound'    // 出庫
  | 'adjustment'  // 調整
  | 'stocktaking'; // 棚卸

// 発注関連
export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  status: POStatus;
  orderDate: string;
  expectedDeliveryDate: string;
  actualDeliveryDate?: string;
  totalAmount: number;
  currency: string;
  paymentTerms: string;
  requesterId: string;
  requesterName: string;
  approverId?: string;
  approverName?: string;
  approvedAt?: string;
  items: PurchaseOrderItem[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type POStatus = 
  | 'draft'           // 下書き
  | 'pending'         // 承認待ち
  | 'approved'        // 承認済（発注済）
  | 'partial'         // 一部入荷
  | 'completed'       // 入荷完了
  | 'cancelled';      // キャンセル

export interface PurchaseOrderItem {
  id: string;
  poId: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  receivedQuantity: number;
  remainingQuantity: number;
  subtotal: number;
}

// 販売関連
export interface SalesOrder {
  id: string;
  soNumber: string;
  customerId: string;
  customerName: string;
  status: SOStatus;
  orderDate: string;
  requestedDeliveryDate: string;
  promisedDeliveryDate: string;
  actualDeliveryDate?: string;
  totalAmount: number;
  salesRepId: string;
  salesRepName: string;
  items: SalesOrderItem[];
  shippingAddress: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type SOStatus = 
  | 'draft'           // 下書き
  | 'confirmed'       // 受注確定
  | 'reserved'        // 在庫引当済
  | 'picked'          // ピッキング済
  | 'shipped'         // 出荷済
  | 'delivered'       // 納品済
  | 'cancelled';      // キャンセル

export interface SalesOrderItem {
  id: string;
  soId: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  reservedQuantity: number;
  shippedQuantity: number;
  subtotal: number;
}

// ダッシュボード関連
export interface DashboardStats {
  inventory: {
    total: number;
    critical: number;
    low: number;
    excess: number;
  };
  purchases: {
    pending: number;
    dueToday: number;
    dueThisWeek: number;
    delayed: number;
  };
  sales: {
    pending: number;
    shipToday: number;
    shipThisWeek: number;
    backorder: number;
  };
  kpi: {
    inventoryTurnover: number;
    stockoutRate: number;
    fillRate: number;
    avgLeadTime: number;
  };
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  category: 'inventory' | 'purchase' | 'sales';
  title: string;
  message: string;
  link?: string;
  createdAt: string;
  isRead: boolean;
}

// カレンダー関連
export interface CalendarEvent {
  id: string;
  title: string;
  type: 'inbound' | 'outbound' | 'stocktaking' | 'holiday';
  date: string;
  time?: string;
  referenceId?: string;
  referenceType?: 'purchase' | 'sales';
  assignee?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  description?: string;
}

// 通知関連
export interface Notification {
  id: string;
  userId: string;
  type: 'approval' | 'alert' | 'reminder' | 'info';
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

// APIレスポンス
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// フィルター・検索
export interface InventoryFilter {
  search?: string;
  category?: string;
  status?: InventoryStatus[];
  locationId?: string;
  supplierId?: string;
}

export interface PurchaseFilter {
  search?: string;
  status?: POStatus[];
  supplierId?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface SalesFilter {
  search?: string;
  status?: SOStatus[];
  customerId?: string;
  dateFrom?: string;
  dateTo?: string;
}