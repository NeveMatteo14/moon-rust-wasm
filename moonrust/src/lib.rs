mod ast;
use std::{cell::RefCell, rc::Rc};

pub use ast::AST;
pub mod interpreter;
pub mod parser;
use interpreter::environment::Env;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn interpret(code: String) -> Result<String, String> {
    let buffer = Rc::new(RefCell::new(Vec::new()));
    let ast = match code.parse::<AST>() {
        Ok(ast) => ast,
        Err(e) => return Err(e.0),
    };
    ast.exec(&mut Env::new(buffer.clone())).map_err(|e| e.0)?;
    let buffer = buffer.borrow();
    Ok(buffer.join("\n"))
}
