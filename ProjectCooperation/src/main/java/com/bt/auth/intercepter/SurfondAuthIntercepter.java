package com.bt.auth.intercepter;

import com.bt.auth.exception.NOPrivilegeException;
import com.bt.common.annotation.SurfondAuthMeta;
import com.thinkgem.jeesite.common.persistence.AttrEntity;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.lang.annotation.Annotation;


/**
 * author fanjinyuan.
 */
@Aspect
@Component
public class SurfondAuthIntercepter {

    @Before("execution(* com.bt.surfond..service..*(..))")
    public void beforeAuth(JoinPoint joinPoint){
        MethodSignature methodSignature = (MethodSignature)joinPoint.getSignature();
        Annotation[] annotations = methodSignature.getMethod().getDeclaredAnnotations();
        SurfondAuthMeta authMeta = null;
        for(Annotation annotation : annotations){
            if(annotation instanceof SurfondAuthMeta){
                authMeta = (SurfondAuthMeta)annotation;
                break;
            }
        }

        if(authMeta == null) {
            return;
        }

        Object[] paramValues = joinPoint.getArgs();
        String[] paramNames = methodSignature.getParameterNames();
        Object targetValue = null;
        for(int i =0; i<paramNames.length; i++){
            if(authMeta.parameterName().equals(paramNames[i])){
                targetValue = paramValues[i];
            }
        }

        String idValue = null;
        if(authMeta.paramType() == SurfondAuthMeta.ParameterType.String){
            idValue = (String)targetValue;
        }else{
            idValue = ((AttrEntity)targetValue).getId();
        }
        CrudService crudService = (CrudService)joinPoint.getThis();
        AttrEntity attrEntity = (AttrEntity)crudService.get(idValue);
        if(!UserUtils.getUser().getId().equals(attrEntity.getUser().getId())){
            throw new NOPrivilegeException("You have no privilege to do this operation");
        }
    }

}
