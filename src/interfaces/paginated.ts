export default interface IPaginated<T> {
  data: T[]; 
  totalElements: number; // Total de clientes tem na base de dados
  page: number; // Pagina que está sendo enviada, para saber qual a página que está sendo exibida
  elements: number; // Quantidade de clientes que trouxe na página atual
  elementsPerPage: number; // Quantidade de clientes que será exibido por página que ira retornar 
  totalPages: number; // Total de páginas que ira retornar
  firstPage: boolean; // Página inicial que ira retornar
  lastPage: boolean; // Página final que ira retornar
}
