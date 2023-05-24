using BookShelf.App.MediatR.BookHandler.Queries;
using BookShelf.Infra.Dto;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BookShelf.WebUI.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class BookShelfController : ControllerBase
    {
        private readonly IMediator _mediator;

        public BookShelfController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<BookDtoResponse>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        public async Task<ActionResult<List<BookDtoResponse>>> GetBooks()
        {
            try
            {
                return Ok(await _mediator.Send(new GetAllBooksQuery()));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(BookDtoResponse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        public async Task<ActionResult<BookDtoResponse>> GetBookById(string id)
        {
            try
            {
                return Ok(await _mediator.Send(new GetByIdBookQuery { Id = id }));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        public async Task<IActionResult> AddBook(BookDtoRequest model)
        {
            try
            {
                await _mediator.Send(new AddBookQuery { BookDto = model });
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        public async Task<IActionResult> UpdateBook(BookDtoResponse model)
        {
            try
            {
                await _mediator.Send(new UpdateBookQuery { BookDtoResponse = model });
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        public async Task<IActionResult> DeleteBook(string id)
        {
            try
            {
                await _mediator.Send(new DeleteBookQuery { Id = id });
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}