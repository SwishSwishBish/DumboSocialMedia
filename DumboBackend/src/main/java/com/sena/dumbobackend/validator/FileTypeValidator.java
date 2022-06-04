package com.sena.dumbobackend.validator;

import com.sena.dumbobackend.service.FileService;
import org.hibernate.validator.constraintvalidation.HibernateConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class FileTypeValidator implements ConstraintValidator <FileType, String>{

    @Autowired
    FileService fileService;

    String[] types;

    @Override
    public void initialize(FileType constraintAnnotation) {
        this.types = constraintAnnotation.types();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if(value == null || value.isEmpty()) {
            return true;
        }
        String fileType = fileService.detectType(value);
        for(String supportedType: this.types) {
            if(fileType.contains(supportedType)) {
                return true;
            }
        }

        String supportedTypes = String.join(", ", this.types);

        context.disableDefaultConstraintViolation();
        HibernateConstraintValidatorContext hibernateConstraintValidatorContext = context.unwrap(HibernateConstraintValidatorContext.class);
        hibernateConstraintValidatorContext.addMessageParameter("types", supportedTypes);
        hibernateConstraintValidatorContext.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate()).addConstraintViolation();
        return false;
    }
}
