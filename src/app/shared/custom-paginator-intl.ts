import { MatPaginatorIntl } from '@angular/material/paginator';

export function getCustomPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = 'Jumlah data per halaman';
  return paginatorIntl;
}
// untuk keperluan mengganti default tulisan pada footer paginator
