import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaModel } from 'src/app/model/CategoriaModel';
import { ProdutosModel } from 'src/app/model/ProdutosModel';
import { CategoriasService } from 'src/app/service/categorias.service';
import { ProdutosService } from 'src/app/service/produtos.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produto-edit',
  templateUrl: './produto-edit.component.html',
  styleUrls: ['./produto-edit.component.css']
})
export class ProdutoEditComponent implements OnInit {

  produto: ProdutosModel = new ProdutosModel()
  categoria: CategoriaModel= new CategoriaModel()
  listCategorias: CategoriaModel[]
  idCategoria: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produtosService: ProdutosService,
    private categoriasService: CategoriasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if(environment.tokenUsuario== ''){
      alert('Sua sessão expirou faça o login novamente.')
      this.router.navigate(['/entrar'])
  }
  let id = this.route.snapshot.params['id']
  this.findByIdProdutos(id)
  this.findAllCategorias()

}

findByIdProdutos(id: number){
this.produtosService.getByIdProdutos(id).subscribe((resp: ProdutosModel)=>{
  this.produto = resp
})

}
findByIdCategorias(){
  this.categoriasService.getByIdCategorias(this.idCategoria).subscribe((resp:CategoriaModel)=>{
    this.categoria = resp
  })
}

findAllCategorias(){
this.categoriasService.getByIdCategorias(this.idCategoria).subscribe((resp: CategoriaModel) =>{
  this.categoria = resp
})

}

atualizar(){
  this.categoria.id=this.idCategoria
  this.produto.categoria=this.categoria
  this.produtosService.putProdutos(this.produto).subscribe((resp:ProdutosModel)=>{
    this.produto = resp
    alert('Produto atualizado com sucesso!')
    this.router.navigate(['/home'])
  })
}


}