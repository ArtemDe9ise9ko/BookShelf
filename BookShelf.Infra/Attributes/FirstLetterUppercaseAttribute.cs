using System.ComponentModel.DataAnnotations;

namespace BookShelf.Infra.Attributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public class FirstLetterUppercaseAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
        {
            if (value != null)
            {
                string stringValue = value.ToString()!;
                if (!string.IsNullOrEmpty(stringValue))
                {
                    if (char.IsLower(stringValue[0]))
                    {
                        return new ValidationResult("The first letter must be uppercase.");
                    }
                }
            }

            return ValidationResult.Success!;
        }
    }
}
