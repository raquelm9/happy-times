export function addressLabel(restaurant) {
  if (!restaurant.id) {
    return "";
  }

  const address = restaurant.address;

  return (
    address.unit +
    " " +
    address.street +
    ", " +
    address.city +
    ", " +
    address.province +
    " " +
    address.postalCode
  );
}
