import { BillItem, BillSettings, CalculationResult, Friend, PersonSummary } from '../types';

export function calculateBill(
  friends: Friend[],
  items: BillItem[],
  settings: BillSettings,
  paidFriendIds: string[] = []
): CalculationResult {
  const itemsSubtotal = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const serviceChargePercent = Math.max(0, settings.serviceChargePercent || 0);
  const vatPercent = Math.max(0, settings.vatPercent || 0);

  // Store / Coupon discount before SC & VAT (supports Baht Amount or Percent %)
  const rawStoreDiscount = Math.max(0, settings.billDiscountAmount || 0);
  const isPercentDiscount = settings.billDiscountType === 'percent';
  const totalStoreDiscount = isPercentDiscount
    ? Math.min(itemsSubtotal, itemsSubtotal * (rawStoreDiscount / 100))
    : Math.min(itemsSubtotal, rawStoreDiscount);
  const netItemsSubtotal = Math.max(0, itemsSubtotal - totalStoreDiscount);

  // Sponsor subsidy & Tip (after SC & VAT)
  const totalDiscount = Math.max(0, settings.discountAmount || 0);
  const totalTip = Math.max(0, settings.tipAmount || 0);

  const totalServiceCharge = netItemsSubtotal * (serviceChargePercent / 100);
  const totalVat = (netItemsSubtotal + totalServiceCharge) * (vatPercent / 100);
  const grandTotal = Math.max(
    0,
    netItemsSubtotal + totalServiceCharge + totalVat + totalTip - totalDiscount
  );

  const unassignedItemIds: string[] = [];

  // Check unassigned items
  items.forEach((item) => {
    if (!item.assignedFriendIds || item.assignedFriendIds.length === 0) {
      unassignedItemIds.push(item.id);
    }
  });

  const personSummaries: PersonSummary[] = friends.map((friend) => {
    let personSubtotal = 0;
    const itemShares = items
      .filter((item) => item.assignedFriendIds?.includes(friend.id))
      .map((item) => {
        const splitCount = item.assignedFriendIds.length;
        const totalItemPrice = (item.price || 0) * (item.quantity || 1);
        const personShare = splitCount > 0 ? totalItemPrice / splitCount : 0;
        personSubtotal += personShare;

        return {
          itemId: item.id,
          itemName: item.name || 'Unnamed item',
          unitPrice: item.price || 0,
          quantity: item.quantity || 1,
          totalItemPrice,
          splitCount,
          personShare,
        };
      });

    const ratio = itemsSubtotal > 0 ? personSubtotal / itemsSubtotal : 0;
    const storeDiscountShare = totalStoreDiscount * ratio;
    const netItemSubtotal = Math.max(0, personSubtotal - storeDiscountShare);
    const serviceChargeShare = totalServiceCharge * ratio;
    const vatShare = totalVat * ratio;
    const discountShare = totalDiscount * ratio;
    const tipShare = totalTip * ratio;

    const finalTotal = Math.max(
      0,
      netItemSubtotal + serviceChargeShare + vatShare + tipShare - discountShare
    );

    return {
      friendId: friend.id,
      friendName: friend.name,
      avatarColor: friend.avatarColor,
      items: itemShares,
      itemSubtotal: personSubtotal,
      netItemSubtotal,
      storeDiscountShare,
      serviceChargeShare,
      vatShare,
      discountShare,
      tipShare,
      finalTotal,
      isPaid: paidFriendIds.includes(friend.id),
    };
  });

  return {
    personSummaries,
    itemsSubtotal,
    totalStoreDiscount,
    netItemsSubtotal,
    totalServiceCharge,
    totalVat,
    totalDiscount,
    totalTip,
    grandTotal,
    unassignedItemIds,
    isFullyAssigned: unassignedItemIds.length === 0,
  };
}

export const AVATAR_COLORS = [
  '#3B82F6', // Blue
  '#EC4899', // Pink
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#6366F1', // Indigo
];

export function getRandomAvatarColor(index: number): string {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}
