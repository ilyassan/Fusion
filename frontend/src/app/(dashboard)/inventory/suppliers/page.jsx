"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Download,
  Mail,
  Phone,
  ChevronsUpDown,
  Check,
  X,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock data
const availableProducts = [
  { id: 1, name: "Laptops", price: 1200 },
  { id: 2, name: "Phones", price: 800 },
  { id: 3, name: "Tablets", price: 500 },
  { id: 4, name: "Paper", price: 5 },
  { id: 5, name: "Pens", price: 2 },
  { id: 6, name: "Furniture", price: 300 }
];

const mockSuppliers = [
  {
    id: 1,
    name: "Tech Supplies Co",
    email: "contact@techsupplies.com",
    phone: "555-0123",
    address: "123 Tech Street",
    productsSupplied: [1, 2, 3]
  },
  {
    id: 2,
    name: "Office Essentials Ltd",
    email: "sales@officeessentials.com",
    phone: "555-0124",
    address: "456 Office Avenue",
    productsSupplied: [4, 5, 6]
  }
];

const mockPurchaseOrders = [
  {
    id: "PO-001",
    supplierId: 1,
    supplierName: "Tech Supplies Co",
    orderDate: "2024-02-01",
    expectedDelivery: "2024-02-15",
    status: "pending",
    items: [
      { productId: 1, name: "Laptops", quantity: 10, price: 1200 },
      { productId: 2, name: "Phones", quantity: 20, price: 800 }
    ]
  },
  {
    id: "PO-002",
    supplierId: 2,
    supplierName: "Office Essentials Ltd",
    orderDate: "2024-02-05",
    expectedDelivery: "2024-02-20",
    status: "received",
    items: [
      { productId: 6, name: "Furniture", quantity: 20, price: 300 }
    ]
  }
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  received: "bg-blue-100 text-blue-800",
  canceled: "bg-red-100 text-red-800"
};

/* -------------------------------------------------------------------------- */
/*                    Purchase Order Modal Component                        */
/* -------------------------------------------------------------------------- */

function PurchaseOrderModal({
  mode = 'add',
  open,
  onClose,
  initialPO = null,
  suppliers,
  availableProducts,
  handleAddPO,
  handleEditPO,
}) {
  // Internal state for order items, supplier, product, and quantity.
  const [orderItems, setOrderItems] = useState([]);
  const [selectedSupplierForPO, setSelectedSupplierForPO] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');

  // When in edit mode, initialize state from the passed‑in purchase order.
  useEffect(() => {
    if (mode === 'edit' && initialPO) {
      const supplier = suppliers.find((s) => s.id === initialPO.supplierId);
      setSelectedSupplierForPO(supplier);
      setOrderItems(initialPO.items || []);
    } else {
      setSelectedSupplierForPO(null);
      setOrderItems([]);
    }
  }, [mode, initialPO, suppliers]);

  // Add a product to the order.
  const addOrderItem = (productId, quantity) => {
    const product = availableProducts.find(
      (p) => p.id.toString() === productId
    );
    if (!product) return;
    const newItem = {
      productId: product.id,
      name: product.name,
      quantity: parseInt(quantity, 10),
      price: product.price,
    };
    setOrderItems((prevItems) => [...prevItems, newItem]);
  };

  const calculateTotal = (items) =>
    items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Reset local state and call parent's onClose.
  const handleClose = () => {
    setOrderItems([]);
    setSelectedSupplierForPO(null);
    setSelectedProduct('');
    setSelectedQuantity('');
    if (onClose) onClose();
  };

  // Determine supplier's available products.
  const supplierProducts =
    selectedSupplierForPO?.productsSupplied ||
    (mode === 'edit' && initialPO
      ? suppliers.find((s) => s.id === initialPO.supplierId)?.productsSupplied || []
      : []);

  return (
    <Dialog
      open={open}
      onOpenChange={(openState) => {
        if (!openState) {
          handleClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Edit Purchase Order' : 'Create Purchase Order'}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const orderDate = e.target.orderDate.value;
            const expectedDelivery = e.target.expectedDelivery.value;
            if (mode === 'edit' && initialPO) {
              const updatedPO = {
                ...initialPO,
                orderDate,
                expectedDelivery,
                items: orderItems,
              };
              handleEditPO(updatedPO);
            } else {
              // Pass new PO data to parent.
              handleAddPO({
                orderDate,
                expectedDelivery,
                supplierId: selectedSupplierForPO?.id,
                items: orderItems,
              });
            }
            handleClose();
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mode === 'add' && (
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Select
                  onValueChange={(value) => {
                    const supplier = suppliers.find(
                      (s) => s.id === parseInt(value, 10)
                    );
                    setSelectedSupplierForPO(supplier);
                    setOrderItems([]);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem
                        key={supplier.id}
                        value={supplier.id.toString()}
                      >
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="orderDate">Order Date</Label>
              <Input
                id="orderDate"
                name="orderDate"
                type="date"
                required
                defaultValue={
                  mode === 'edit' && initialPO ? initialPO.orderDate : ''
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedDelivery">Expected Delivery</Label>
              <Input
                id="expectedDelivery"
                name="expectedDelivery"
                type="date"
                required
                defaultValue={
                  mode === 'edit' && initialPO ? initialPO.expectedDelivery : ''
                }
              />
            </div>
          </div>

          {(selectedSupplierForPO || mode === 'edit') && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className='md:col-span-2'>
                  <Label htmlFor="product">Product</Label>
                  <Select
                    id="product"
                    onValueChange={(value) => setSelectedProduct(value)}
                    value={selectedProduct}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableProducts
                        .filter((product) =>
                          supplierProducts.includes(product.id)
                        )
                        .map((product) => (
                          <SelectItem
                            key={product.id}
                            value={product.id.toString()}
                          >
                            {product.name} (${product.price})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    placeholder="Enter quantity"
                    value={selectedQuantity}
                    onChange={(e) => setSelectedQuantity(e.target.value)}
                  />
                </div>
                <div className="flex justify-end items-end">
                  <Button
                    type="button"
                    onClick={() => {
                      if (
                        selectedProduct &&
                        selectedQuantity &&
                        parseInt(selectedQuantity, 10) > 0
                      ) {
                        addOrderItem(selectedProduct, selectedQuantity);
                        setSelectedProduct('');
                        setSelectedQuantity('');
                      }
                    }}
                    className="mt-6 bg-blue-500 hover:bg-blue-600 flex items-center"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="font-semibold mb-2">Order Items</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.price}</TableCell>
                        <TableCell>
                          ${ (item.price * item.quantity).toLocaleString() }
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setOrderItems(orderItems.filter((_, i) => i !== index))
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-semibold">
                        Total:
                      </TableCell>
                      <TableCell colSpan={2} className="font-semibold">
                        ${ calculateTotal(orderItems).toLocaleString() }
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={orderItems.length === 0}
            >
              {mode === 'edit' ? 'Update Order' : 'Create Order'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------------------- */
/*                        Main Page Component                                 */
/* -------------------------------------------------------------------------- */

export default function SuppliersAndPurchasesPage() {
  const [suppliers, setSuppliers] = useState(mockSuppliers);
  const [purchaseOrders, setPurchaseOrders] = useState(mockPurchaseOrders);
  const [searchSupplier, setSearchSupplier] = useState("");
  const [searchPO, setSearchPO] = useState("");
  const [isAddSupplierModalOpen, setIsAddSupplierModalOpen] = useState(false);
  const [isAddPOModalOpen, setIsAddPOModalOpen] = useState(false);
  const [isEditSupplierModalOpen, setIsEditSupplierModalOpen] = useState(false);
  const [isEditPOModalOpen, setIsEditPOModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedPO, setSelectedPO] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, type: null, id: null });

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your data export has begun and will be ready shortly.",
    });
  };

  const handleAddSupplier = (newSupplier) => {
    setSuppliers([...suppliers, { ...newSupplier, id: suppliers.length + 1 }]);
    setIsAddSupplierModalOpen(false);
    setSelectedProducts([]);
    toast({
      title: "Supplier Added",
      description: `${newSupplier.name} has been added to your suppliers.`,
    });
  };

  const handleEditSupplier = (updatedSupplier) => {
    setSuppliers(suppliers.map(s => s.id === updatedSupplier.id ? updatedSupplier : s));
    setIsEditSupplierModalOpen(false);
    setSelectedProducts([]);
    toast({
      title: "Supplier Updated",
      description: `${updatedSupplier.name}'s information has been updated.`,
    });
  };

  // Updated handleAddPO now accepts a PO object from the modal.
  const handleAddPO = (po) => {
    const newPO = {
      id: `PO-${purchaseOrders.length + 1}`,
      supplierId: po.supplierId,
      supplierName: suppliers.find(s => s.id === po.supplierId)?.name,
      orderDate: po.orderDate,
      expectedDelivery: po.expectedDelivery,
      status: 'pending',
      items: po.items
    };
    
    setPurchaseOrders([...purchaseOrders, newPO]);
    toast({
      title: "Purchase Order Created",
      description: `Purchase order ${newPO.id} has been created.`,
    });
  };

  const handleEditPO = (updatedPO) => {
    setPurchaseOrders(purchaseOrders.map(po => po.id === updatedPO.id ? updatedPO : po));
    setIsEditPOModalOpen(false);
    toast({
      title: "Purchase Order Updated",
      description: `Purchase order ${updatedPO.id} has been updated.`,
    });
  };

  // Suppliers Section
  const SuppliersSection = () => (
    <Card className="mb-6">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Suppliers</CardTitle>
        <Button
          onClick={() => setIsAddSupplierModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Supplier
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search suppliers..."
            value={searchSupplier}
            onChange={(e) => setSearchSupplier(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Supplier Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Products Supplied</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers
              .filter(supplier =>
                supplier.name.toLowerCase().includes(searchSupplier.toLowerCase()) ||
                supplier.email.toLowerCase().includes(searchSupplier.toLowerCase())
              )
              .map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.phone}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {supplier.productsSupplied.map((productId) => (
                        <Badge key={productId} variant="secondary">
                          {availableProducts.find(p => p.id === productId)?.name}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedSupplier(supplier);
                        setSelectedProducts(
                          availableProducts
                            .filter(product => supplier.productsSupplied.includes(product.id))
                            .map(product => product.id)
                        );
                        setIsEditSupplierModalOpen(true);
                      }}
                      className="mr-2"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteConfirmation({
                        isOpen: true,
                        type: 'supplier',
                        id: supplier.id
                      })}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  // Products Multi‑Select Component (used in supplier modal)
  const ProductsMultiSelect = ({ value = [], onChange = () => {} }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);
  
    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    const filteredProducts = availableProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const toggleProduct = (productId) => {
      onChange(
        value.includes(productId)
          ? value.filter(id => id !== productId)
          : [...value, productId]
      );
    };
  
    return (
      <div className="relative" ref={dropdownRef}>
        {/* Selected products display */}
        <div className="flex flex-wrap gap-1 min-h-[2.5rem] p-2 border rounded-md mb-2">
          {value.map((productId) => {
            const product = availableProducts.find(p => p.id === productId);
            return (
              <Badge
                key={productId}
                variant="secondary"
                className="flex items-center gap-1 bg-blue-100"
              >
                {product?.name}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleProduct(productId);
                  }}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
  
        {/* Dropdown trigger button */}
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>
            {value.length > 0
              ? `${value.length} product${value.length > 1 ? 's' : ''} selected`
              : "Select products..."}
          </span>
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
  
        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg">
            <div className="p-2 border-b">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
  
            <div className="max-h-64 overflow-y-auto">
              {filteredProducts.length === 0 ? (
                <div className="p-2 text-center text-gray-500">
                  No products found
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => toggleProduct(product.id)}
                    className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                        value.includes(product.id)
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}>
                        {value.includes(product.id) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Purchase Orders Section
  const PurchaseOrdersSection = () => (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Purchase Orders</CardTitle>
        <Button
          onClick={() => setIsAddPOModalOpen(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Purchase Order
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search purchase orders..."
            value={searchPO}
            onChange={(e) => setSearchPO(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Expected Delivery</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Value</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseOrders
              .filter(po =>
                po.id.toLowerCase().includes(searchPO.toLowerCase()) ||
                po.supplierName.toLowerCase().includes(searchPO.toLowerCase())
              )
              .map((po) => (
                <TableRow key={po.id}>
                  <TableCell className="font-medium">{po.id}</TableCell>
                  <TableCell>{po.supplierName}</TableCell>
                  <TableCell>{po.orderDate}</TableCell>
                  <TableCell>{po.expectedDelivery}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[po.status]}>
                      {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    ${ po.items ? po.items.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString() : '0' }
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedPO(po);
                        setIsEditPOModalOpen(true);
                      }}
                      className="mr-2"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteConfirmation({
                        isOpen: true,
                        type: 'po',
                        id: po.id
                      })}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Suppliers & Purchases</h2>
          <p className="text-gray-500">Manage your suppliers and purchase orders</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              /* Implement export logic */
            }}
          >
            <Download className="mr-2 h-4 w-4 text-blue-500" /> Export Data
          </Button>
        </div>
      </div>

      <SuppliersSection />
      <PurchaseOrdersSection />

      {/* Add/Edit Supplier Modal */}
      <Dialog 
        open={isAddSupplierModalOpen || isEditSupplierModalOpen} 
        onOpenChange={(open) => {
          if (!open) {
            setIsAddSupplierModalOpen(false);
            setIsEditSupplierModalOpen(false);
            setSelectedSupplier(null);
            setSelectedProducts([]);
            setProductSearch('');
          }
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditSupplierModalOpen ? 'Edit Supplier' : 'Add New Supplier'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const supplierData = {
              name: formData.get('name'),
              email: formData.get('email'),
              phone: formData.get('phone'),
              address: formData.get('address'),
              productsSupplied: selectedProducts,
            };
            
            if (isEditSupplierModalOpen) {
              handleEditSupplier({ ...supplierData, id: selectedSupplier.id });
            } else {
              handleAddSupplier(supplierData);
            }
          }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Supplier Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  required 
                  defaultValue={selectedSupplier?.name}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  defaultValue={selectedSupplier?.email}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  required 
                  defaultValue={selectedSupplier?.phone}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea 
                id="address" 
                name="address" 
                required 
                defaultValue={selectedSupplier?.address}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productsSupplied">Products Supplied</Label>
              <ProductsMultiSelect 
                value={selectedProducts} 
                onChange={setSelectedProducts} 
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {isEditSupplierModalOpen ? 'Update Supplier' : 'Add Supplier'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Purchase Order Modal using the new component */}
      <PurchaseOrderModal
        mode={isEditPOModalOpen ? 'edit' : 'add'}
        open={isAddPOModalOpen || isEditPOModalOpen}
        onClose={() => {
          setIsAddPOModalOpen(false);
          setIsEditPOModalOpen(false);
          setSelectedPO(null);
        }}
        initialPO={selectedPO}
        suppliers={suppliers}
        availableProducts={availableProducts}
        handleAddPO={handleAddPO}
        handleEditPO={handleEditPO}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog 
        open={deleteConfirmation.isOpen} 
        onOpenChange={(isOpen) => setDeleteConfirmation({ ...deleteConfirmation, isOpen })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the {deleteConfirmation.type} from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteConfirmation.type === 'supplier') {
                  setSuppliers(suppliers.filter(s => s.id !== deleteConfirmation.id));
                } else if (deleteConfirmation.type === 'po') {
                  setPurchaseOrders(purchaseOrders.filter(po => po.id !== deleteConfirmation.id));
                }
                setDeleteConfirmation({ isOpen: false, type: null, id: null });
                toast({
                  title: `${deleteConfirmation.type === 'supplier' ? 'Supplier' : 'Purchase Order'} Deleted`,
                  description: `The ${deleteConfirmation.type} has been successfully deleted.`,
                  variant: "destructive",
                });
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
