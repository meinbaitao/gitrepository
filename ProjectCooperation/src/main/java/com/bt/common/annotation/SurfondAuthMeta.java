package com.bt.common.annotation;


import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * author fanjinyuan.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface SurfondAuthMeta {


    /**
     * 指定可以获取对象Id的参数名称
     * @return
     */
    String parameterName();

    /**
     * 指定参数的类型，class 还是 value
     * @return
     */
    ParameterType paramType();



    enum ParameterType {

        AttrEntity, String;

    }

}
