using BookShelf.App.MediatR.BookHandler.Queries;
using BookShelf.Infra.Dto;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BookShelf.WebUI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookShelfController : ControllerBase
    {
        private readonly IMediator _mediator;

        public BookShelfController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<BookDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        public async Task<ActionResult<List<BookDto>>> GetBooks()
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

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(BookDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        public async Task<ActionResult<BookDto>> GetBookById(string id)
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
        public async Task<IActionResult> AddBook(BookDto model)
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

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        public async Task<IActionResult> UpdateBook(string id, BookDto model)
        {
            try
            {
                await _mediator.Send(new UpdateBookQuery { Id = id, BookDto = model });
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
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